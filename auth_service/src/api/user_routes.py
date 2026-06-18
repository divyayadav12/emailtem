from fastapi import APIRouter, Depends

from schemas.users import (
    CreateUserRequest,
    UpdateUserRequest,
    AssignRoleRequest
)

from services.user_service import (
    create_user,
    get_users,
    get_user_by_id,
    update_user,
    disable_user,
    assign_role
)

from core.dependencies import role_required

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/create")
def create_user_route(
    data: CreateUserRequest,
    current_user=Depends(
        role_required(
            [
                "SUPER_ADMIN",
                "ADMIN",
                "MANAGER"
            ]
        )
    )
):
    return create_user(data)


@router.get("/")
def get_users_route():
    return get_users()


@router.get("/{user_id}")
def get_user_route(user_id: int):
    return get_user_by_id(user_id)


@router.put("/{user_id}")
def update_user_route(
    user_id: int,
    data: UpdateUserRequest,
    current_user=Depends(
        role_required(
            [
                "SUPER_ADMIN",
                "ADMIN",
                "MANAGER"
            ]
        )
    )
):
    return update_user(
        user_id,
        data
    )


@router.put("/{user_id}/role")
def assign_role_route(
    user_id: int,
    data: AssignRoleRequest,
    current_user=Depends(
        role_required(
            [
                "SUPER_ADMIN",
                "ADMIN"
            ]
        )
    )
):
    return assign_role(
        user_id,
        data
    )


@router.delete("/{user_id}")
def disable_user_route(
    user_id: int,
    current_user=Depends(
        role_required(
            [
                "SUPER_ADMIN",
                "ADMIN",
                "MANAGER"
            ]
        )
    )
):
    return disable_user(user_id)
