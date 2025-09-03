from fastapi import APIRouter
from backend.schema.llm_chat_schema import LLMChat
from backend.schema.db import get_all_chats

router = APIRouter()

@router.get("/chats", response_model=list[LLMChat])
def get_chats():
	return get_all_chats()
