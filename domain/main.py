from fastapi import FastAPI

from routers.domain import router


app = FastAPI(
    title="Domain Service"
)


app.include_router(router)


@app.get("/")
def home():
    return {
        "message": "Domain Service Running"
    }