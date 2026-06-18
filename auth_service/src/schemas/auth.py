from pydantic import BaseModel


class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    role: str


class LoginRequest(BaseModel):
    email: str
    password: str


class LogoutRequest(BaseModel):
    token: str


class VerifyEmailRequest(BaseModel):
    verification_token: str


class ForgotPasswordRequest(BaseModel):
    email: str


class ResetPasswordRequest(BaseModel):
    reset_token: str
    new_password: str


class ChangePasswordRequest(BaseModel):
    email: str
    old_password: str
    new_password: str