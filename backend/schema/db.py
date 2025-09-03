from typing import Dict
from .llm_chat_schema import LLMChat

chats: Dict[str, LLMChat] = {}

def add_chat(chat: LLMChat):
    chats[chat.id] = chat

def get_chat(chat_id: str) -> LLMChat | None:
    return chats.get(chat_id)

def get_all_chats() -> list[LLMChat]:
    return list(chats.values())

def delete_chat(chat_id: str):
    chats.pop(chat_id, None)
