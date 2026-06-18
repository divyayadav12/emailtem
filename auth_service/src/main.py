from fastapi import FastAPI

from api.auth_routes import router as auth_router
from api.user_routes import router as user_router

app = FastAPI(
    title="Enterprise Email Platform"
)

app.include_router(auth_router)
app.include_router(user_router)