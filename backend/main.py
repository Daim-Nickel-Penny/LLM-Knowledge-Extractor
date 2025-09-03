from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes.analyze import router as analyze_router
from backend.routes.chats import router as chats_router
from backend.routes.search import router as search_router

from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(analyze_router)
app.include_router(chats_router)
app.include_router(search_router)

@app.get("/")
def read_root():
    return {"Hello": "World"}


