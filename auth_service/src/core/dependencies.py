from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer

from core.security import decode_access_token

security = HTTPBearer()


def get_current_user(
    credentials=Depends(security)
):

    token = credentials.credentials

    try:

        payload = decode_access_token(
            token
        )

        return payload

    except Exception:

        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )


def role_required(
    allowed_roles
):

    def checker(
        current_user=Depends(
            get_current_user
        )
    ):

        if current_user["role"] not in allowed_roles:

            raise HTTPException(
                status_code=403,
                detail="Access Denied"
            )

        return current_user

    return checker
