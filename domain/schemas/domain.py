from pydantic import BaseModel


class DomainCreate(BaseModel):
    domain_name: str


class DomainResponse(BaseModel):
    id: int
    domain_name: str
    status: str
