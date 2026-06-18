from pydantic import BaseModel


class CreateUserRequest(BaseModel):
    name: str
    email: str
    password: str
    role: str


class UpdateUserRequest(BaseModel):
    name: str
    email: str


class AssignRoleRequest(BaseModel):
    role: str