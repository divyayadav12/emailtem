from fastapi import HTTPException

from database.connection import get_connection
from core.security import hash_password


def create_user(data):

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

        if cur.fetchone():
            raise HTTPException(
                status_code=409,
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
                status_code=404,
                detail="Role not found"
            )

        role_id = role[0]

        password_hash = hash_password(
            data.password
        )

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
                password_hash,
                role_id
            )
        )

        user_id = cur.fetchone()[0]

        conn.commit()

        return {
            "message": "User created successfully",
            "user_id": user_id
        }

    finally:

        cur.close()
        conn.close()


def get_users():

    conn = get_connection()
    cur = conn.cursor()

    try:

        cur.execute(
            """
            SELECT
                u.id,
                u.name,
                u.email,
                r.name
            FROM users u
            JOIN roles r
            ON u.role_id = r.id
            WHERE u.is_active = TRUE
            ORDER BY u.id
            """
        )

        rows = cur.fetchall()

        result = []

        for row in rows:

            result.append(
                {
                    "id": row[0],
                    "name": row[1],
                    "email": row[2],
                    "role": row[3]
                }
            )

        return result

    finally:

        cur.close()
        conn.close()
def get_user_by_id(user_id):

    conn = get_connection()
    cur = conn.cursor()

    try:

        cur.execute(
            """
            SELECT
                u.id,
                u.name,
                u.email,
                r.name
            FROM users u
            JOIN roles r
            ON u.role_id = r.id
            WHERE u.id = %s
            AND u.is_active = TRUE
            """,
            (user_id,)
        )

        user = cur.fetchone()

        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

        return {
            "id": user[0],
            "name": user[1],
            "email": user[2],
            "role": user[3]
        }

    finally:

        cur.close()
        conn.close()


def update_user(user_id, data):

    conn = get_connection()
    cur = conn.cursor()

    try:

        cur.execute(
            """
            UPDATE users
            SET
                name = %s,
                email = %s,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = %s
            RETURNING id
            """,
            (
                data.name,
                data.email,
                user_id
            )
        )

        user = cur.fetchone()

        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

        conn.commit()

        return {
            "message": "User updated successfully"
        }

    finally:

        cur.close()
        conn.close()


def disable_user(user_id):

    conn = get_connection()
    cur = conn.cursor()

    try:

        cur.execute(
            """
            UPDATE users
            SET
                is_active = FALSE,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = %s
            RETURNING id
            """,
            (user_id,)
        )

        user = cur.fetchone()

        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

        conn.commit()

        return {
            "message": "User disabled successfully",
            "user_id": user_id
        }

    finally:

        cur.close()
        conn.close()


def assign_role(user_id, data):

    conn = get_connection()
    cur = conn.cursor()

    try:

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
                status_code=404,
                detail="Role not found"
            )

        role_id = role[0]

        cur.execute(
            """
            UPDATE users
            SET
                role_id = %s,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = %s
            RETURNING id
            """,
            (
                role_id,
                user_id
            )
        )

        user = cur.fetchone()

        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

        conn.commit()

        return {
            "message": "Role assigned successfully",
            "user_id": user_id,
            "role": data.role.upper()
        }

    finally:

        cur.close()
        conn.close()
