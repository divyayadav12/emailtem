from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from services.email_service import send_otp_email
import bcrypt
import jwt
import os
import secrets

from datetime import datetime, timedelta
from dotenv import load_dotenv

from database.connection import get_connection
import secrets

from datetime import (
    datetime,
    timedelta
)
from core.security import (
    hash_password,
    verify_password,
    create_access_token
)

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    role: str = "EMPLOYEE"


class LoginRequest(BaseModel):
    email: str
    password: str


class VerifyEmailRequest(BaseModel):
    verification_token: str


class LogoutRequest(BaseModel):
    token: str


class ForgotPasswordRequest(BaseModel):
    email: str


class ResetPasswordRequest(BaseModel):
    reset_token: str
    new_password: str


class ChangePasswordRequest(BaseModel):
    email: str
    old_password: str
    new_password: str


@router.post("/register")
def register(data: RegisterRequest):

    conn = get_connection()
    cur = conn.cursor()

    try:

        cur.execute(
            "SELECT id FROM users WHERE email = %s",
            (data.email,)
        )

        existing_user = cur.fetchone()

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already exists"
            )
        cur.execute(
        """
        SELECT id
        FROM roles
        WHERE name = %s
        """,
    (data.role.upper(),)
)


        role = cur.fetchone()

        if not role:
            raise HTTPException(
                status_code=500,
                detail="USER role not found"
            )

        role_id = role[0]

        hashed_password = bcrypt.hashpw(
            data.password.encode("utf-8"),
            bcrypt.gensalt()
        ).decode("utf-8")

        cur.execute(
            """
            INSERT INTO users
            (
                name,
                email,
                password_hash,
                role_id
            )
            VALUES
            (
                %s,
                %s,
                %s,
                %s
            )
            RETURNING id
            """,
            (
                data.name,
                data.email,
                hashed_password,
                role_id
            )
        )

        user_id = cur.fetchone()[0]

        verification_token = secrets.token_urlsafe(32)

        expires_at = datetime.utcnow() + timedelta(hours=24)

        cur.execute(
            """
            INSERT INTO email_verifications
            (
                user_id,
                verification_token,
                expires_at
            )
            VALUES
            (
                %s,
                %s,
                %s
            )
            """,
            (
                user_id,
                verification_token,
                expires_at
            )
        )

        cur.execute(
            """
            INSERT INTO audit_logs
            (
                user_id,
                action,
                entity_type,
                entity_id
            )
            VALUES
            (
                %s,
                %s,
                %s,
                %s
            )
            """,
            (
                user_id,
                "USER_REGISTERED",
                "users",
                user_id
            )
        )

        conn.commit()

        return {
            "message": "User registered successfully",
            "user_id": user_id,
            "verification_token": verification_token
        }

    except HTTPException:
        raise

    except Exception as e:

        conn.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        cur.close()
        conn.close()


@router.post("/login")
def login(data: LoginRequest):

    conn = get_connection()
    cur = conn.cursor()

    try:

        cur.execute(
            """
            SELECT
                u.id,
                u.email,
                u.password_hash,
                u.failed_login_attempts,
                u.account_locked,
                r.name
            FROM users u
            JOIN roles r
            ON u.role_id = r.id
            WHERE u.email = %s
            """,
            (data.email,)
        )

        user = cur.fetchone()

        if not user:
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password"
            )

        user_id = user[0]
        email = user[1]
        password_hash = user[2]
        failed_attempts = user[3]
        account_locked = user[4]
        role = user[5]

        if account_locked:
            raise HTTPException(
                status_code=403,
                detail="Account is locked"
            )

        password_valid = bcrypt.checkpw(
            data.password.encode("utf-8"),
            password_hash.encode("utf-8")
        )

        if not password_valid:

            failed_attempts += 1

            cur.execute(
                """
                UPDATE users
                SET failed_login_attempts = %s
                WHERE id = %s
                """,
                (
                    failed_attempts,
                    user_id
                )
            )

            if failed_attempts >= 5:

                cur.execute(
                    """
                    UPDATE users
                    SET account_locked = TRUE
                    WHERE id = %s
                    """,
                    (user_id,)
                )

            conn.commit()

            raise HTTPException(
                status_code=401,
                detail="Invalid email or password"
            )

        # Reset failed attempts

        cur.execute(
            """
            UPDATE users
            SET
                failed_login_attempts = 0,
                last_login = CURRENT_TIMESTAMP
            WHERE id = %s
            """,
            (user_id,)
        )

        # Generate MFA OTP

        otp = str(
            secrets.randbelow(900000)
            + 100000
        )

        expires_at = (
            datetime.utcnow()
            + timedelta(minutes=5)
        )

        cur.execute(
            """
            INSERT INTO mfa_otps
            (
                user_id,
                otp,
                expires_at
            )
            VALUES
            (
                %s,
                %s,
                %s
            )
            """,
            (
                user_id,
                otp,
                expires_at
            )
        )
        
        send_otp_email(
    email,
    otp
)
        

        # Audit Log

        cur.execute(
            """
            INSERT INTO audit_logs
            (
                user_id,
                action,
                entity_type,
                entity_id
            )
            VALUES
            (
                %s,
                %s,
                %s,
                %s
            )
            """,
            (
                user_id,
                "OTP_GENERATED",
                "users",
                user_id
            )
        )

        conn.commit()

        send_otp_email(
    email,
    otp
)

        return {
            "message": "OTP Sent",
            "user_id": user_id,
            "expires_in": "5 minutes"
        }

    except HTTPException:
        raise

    except Exception as e:

        conn.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        cur.close()
        conn.close()

@router.post("/verify-email")
def verify_email(data: VerifyEmailRequest):

    conn = get_connection()
    cur = conn.cursor()

    try:

        cur.execute(
            """
            SELECT
                id,
                user_id,
                is_verified,
                expires_at
            FROM email_verifications
            WHERE verification_token = %s
            """,
            (data.verification_token,)
        )

        verification = cur.fetchone()

        if not verification:
            raise HTTPException(
                status_code=404,
                detail="Invalid verification token"
            )

        verification_id = verification[0]
        user_id = verification[1]
        is_verified = verification[2]
        expires_at = verification[3]

        if is_verified:
            raise HTTPException(
                status_code=400,
                detail="Email already verified"
            )

        if datetime.utcnow() > expires_at:
            raise HTTPException(
                status_code=400,
                detail="Verification token expired"
            )

        cur.execute(
            """
            UPDATE email_verifications
            SET is_verified = TRUE
            WHERE id = %s
            """,
            (verification_id,)
        )

        cur.execute(
            """
            UPDATE users
            SET email_verified = TRUE
            WHERE id = %s
            """,
            (user_id,)
        )

        cur.execute(
            """
            INSERT INTO audit_logs
            (
                user_id,
                action,
                entity_type,
                entity_id
            )
            VALUES
            (
                %s,
                %s,
                %s,
                %s
            )
            """,
            (
                user_id,
                "EMAIL_VERIFIED",
                "users",
                user_id
            )
        )

        conn.commit()

        return {
            "message": "Email verified successfully"
        }

    except HTTPException:
        raise

    except Exception as e:

        conn.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        cur.close()
        conn.close()
@router.post("/logout")
def logout(data: LogoutRequest):

    conn = get_connection()
    cur = conn.cursor()

    try:

        cur.execute(
            """
            SELECT user_id
            FROM auth_tokens
            WHERE token = %s
            """,
            (data.token,)
        )

        token_record = cur.fetchone()

        if not token_record:
            raise HTTPException(
                status_code=404,
                detail="Token not found"
            )

        user_id = token_record[0]

        cur.execute(
            """
            DELETE FROM auth_tokens
            WHERE token = %s
            """,
            (data.token,)
        )

        cur.execute(
            """
            INSERT INTO audit_logs
            (
                user_id,
                action,
                entity_type,
                entity_id
            )
            VALUES
            (
                %s,
                %s,
                %s,
                %s
            )
            """,
            (
                user_id,
                "USER_LOGOUT",
                "users",
                user_id
            )
        )

        conn.commit()

        return {
            "message": "Logout successful"
        }

    except HTTPException:
        raise

    except Exception as e:

        conn.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        cur.close()
        conn.close()
@router.post("/forgot-password")
def forgot_password(data: ForgotPasswordRequest):

    conn = get_connection()
    cur = conn.cursor()

    try:

        cur.execute(
            """
            SELECT id
            FROM users
            WHERE email = %s
            """,
            (data.email,)
        )

        user = cur.fetchone()

        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

        user_id = user[0]

        reset_token = str(
            secrets.randbelow(900000)
            + 100000
        )
        
        send_otp_email(
            data.email,
            reset_token
        )

        expires_at = datetime.utcnow() + timedelta(minutes=15)

        cur.execute(
            """
            INSERT INTO password_resets
            (
                user_id,
                reset_token,
                expires_at
            )
            VALUES
            (
                %s,
                %s,
                %s
            )
            """,
            (
                user_id,
                reset_token,
                expires_at
            )
        )

        cur.execute(
            """
            INSERT INTO audit_logs
            (
                user_id,
                action,
                entity_type,
                entity_id
            )
            VALUES
            (
                %s,
                %s,
                %s,
                %s
            )
            """,
            (
                user_id,
                "PASSWORD_RESET_REQUESTED",
                "users",
                user_id
            )
        )

        conn.commit()

        return {
            "message": "Password reset OTP sent to email"
        }

    except HTTPException:
        raise

    except Exception as e:

        conn.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        cur.close()
        conn.close()
@router.post("/reset-password")
def reset_password(data: ResetPasswordRequest):

    conn = get_connection()
    cur = conn.cursor()

    try:

        cur.execute(
            """
            SELECT
                id,
                user_id,
                used,
                expires_at
            FROM password_resets
            WHERE reset_token = %s
            """,
            (data.reset_token,)
        )

        reset_record = cur.fetchone()

        if not reset_record:
            raise HTTPException(
                status_code=404,
                detail="Invalid reset token"
            )

        reset_id = reset_record[0]
        user_id = reset_record[1]
        used = reset_record[2]
        expires_at = reset_record[3]

        if used:
            raise HTTPException(
                status_code=400,
                detail="Token already used"
            )

        if datetime.utcnow() > expires_at:
            raise HTTPException(
                status_code=400,
                detail="Reset token expired"
            )

        hashed_password = bcrypt.hashpw(
            data.new_password.encode("utf-8"),
            bcrypt.gensalt()
        ).decode("utf-8")

        cur.execute(
            """
            UPDATE users
            SET password_hash = %s
            WHERE id = %s
            """,
            (
                hashed_password,
                user_id
            )
        )

        cur.execute(
            """
            UPDATE password_resets
            SET used = TRUE
            WHERE id = %s
            """,
            (reset_id,)
        )

        cur.execute(
            """
            INSERT INTO audit_logs
            (
                user_id,
                action,
                entity_type,
                entity_id
            )
            VALUES
            (
                %s,
                %s,
                %s,
                %s
            )
            """,
            (
                user_id,
                "PASSWORD_RESET_COMPLETED",
                "users",
                user_id
            )
        )

        conn.commit()

        return {
            "message": "Password reset successful"
        }

    except HTTPException:
        raise

    except Exception as e:

        conn.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        cur.close()
        conn.close()
@router.post("/change-password")
def change_password(data: ChangePasswordRequest):

    conn = get_connection()
    cur = conn.cursor()

    try:

        cur.execute(
            """
            SELECT id,password_hash
            FROM users
            WHERE email = %s
            """,
            (data.email,)
        )

        user = cur.fetchone()

        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

        user_id = user[0]
        password_hash = user[1]

        valid_password = bcrypt.checkpw(
            data.old_password.encode("utf-8"),
            password_hash.encode("utf-8")
        )

        if not valid_password:
            raise HTTPException(
                status_code=400,
                detail="Old password is incorrect"
            )

        new_hash = bcrypt.hashpw(
            data.new_password.encode("utf-8"),
            bcrypt.gensalt()
        ).decode("utf-8")

        cur.execute(
            """
            UPDATE users
            SET password_hash = %s
            WHERE id = %s
            """,
            (
                new_hash,
                user_id
            )
        )

        cur.execute(
            """
            INSERT INTO audit_logs
            (
                user_id,
                action,
                entity_type,
                entity_id
            )
            VALUES
            (
                %s,
                %s,
                %s,
                %s
            )
            """,
            (
                user_id,
                "PASSWORD_CHANGED",
                "users",
                user_id
            )
        )

        conn.commit()

        return {
            "message": "Password changed successfully"
        }

    except HTTPException:
        raise

    except Exception as e:

        conn.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        cur.close()
        conn.close()
def verify_mfa_otp(data):

    conn = get_connection()
    cur = conn.cursor()

    try:

        cur.execute(
            """
            SELECT
                id,
                expires_at,
                is_used
            FROM mfa_otps
            WHERE
                user_id = %s
                AND otp = %s
            ORDER BY id DESC
            LIMIT 1
            """,
            (
                data.user_id,
                data.otp
            )
        )

        otp_record = cur.fetchone()

        if not otp_record:

            raise HTTPException(
                status_code=401,
                detail="Invalid OTP"
            )

        otp_id = otp_record[0]
        expires_at = otp_record[1]
        is_used = otp_record[2]

        # OTP already used

        if is_used:

            raise HTTPException(
                status_code=401,
                detail="OTP already used"
            )

        # OTP expired

        if datetime.utcnow() > expires_at:

            raise HTTPException(
                status_code=401,
                detail="OTP expired"
            )

        # Mark used

        cur.execute(
            """
            UPDATE mfa_otps
            SET is_used = TRUE
            WHERE id = %s
            """,
            (otp_id,)
        )

        cur.execute(
            """
            SELECT
                u.id,
                u.email,
                r.name
            FROM users u
            JOIN roles r
            ON u.role_id = r.id
            WHERE u.id = %s
            """,
            (data.user_id,)
        )

        user = cur.fetchone()

        token = create_access_token(
            user[0],
            user[1],
            user[2]
        )

        conn.commit()

        return {
            "message": "Login Successful",
            "access_token": token,
            "role": user[2]
        }

    finally:

        cur.close()
        conn.close()