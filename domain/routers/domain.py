from fastapi import APIRouter, HTTPException

from schemas.domain import (
    DomainCreate
)

from services.domain_service import (
    add_domain,
    get_domains,
    verify_domain,
    get_domain_status
)

router = APIRouter(
    prefix="/domains",
    tags=["Domains"]
)


@router.post("/")
def create_domain(
    domain: DomainCreate
):
    return add_domain(
        domain.domain_name
    )


@router.get("/")
def list_domains():

    return get_domains()


@router.get("/{domain_id}/status")
def domain_status(domain_id: int):

    domain = get_domain_status(
        domain_id
    )

    if not domain:

        raise HTTPException(
            status_code=404,
            detail="Domain not found"
        )

    return domain


@router.post("/{domain_id}/verify")
def verify(domain_id: int):

    domain = verify_domain(
        domain_id
    )

    if not domain:

        raise HTTPException(
            status_code=404,
            detail="Domain not found"
        )

    return domain