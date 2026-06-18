from fastapi import APIRouter

from schemas.auth import (
    RegisterRequest,
    LoginRequest,
    LogoutRequest
)

from services.auth_service import (
    register as register_user,
    login as login_user,
    logout as logout_user
)
from schemas.auth import (
    VerifyEmailRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    ChangePasswordRequest
)
from services.auth_service import (
    verify_email,
    forgot_password,
    reset_password,
    change_password
)
router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(
    data: RegisterRequest
):
    return register_user(data)


@router.post("/login")
def login(
    data: LoginRequest
):
    return login_user(data)


@router.post("/logout")
def logout(
    data: LogoutRequest
):
    return logout_user(data)

@router.post("/verify-email")
def verify_email_route(
    data: VerifyEmailRequest
):
    return verify_email(data)


@router.post("/forgot-password")
def forgot_password_route(
    data: ForgotPasswordRequest
):
    return forgot_password(data)


@router.post("/reset-password")
def reset_password_route(
    data: ResetPasswordRequest
):
    return reset_password(data)


@router.post("/change-password")
def change_password_route(
    data: ChangePasswordRequest
):
    return change_password(data)
