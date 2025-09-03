

from fastapi import APIRouter, Query
from backend.schema.db import get_all_chats
from backend.schema.llm_chat_schema import LLMChat

router = APIRouter()

@router.get("/search", response_model=list[LLMChat])
def search_chats(query: str = Query(None)):
	results = []
	for chat in get_all_chats():
		if not query:
			continue
		if query.lower() in chat.llm_response.sentiment.lower():
			results.append(chat)
			continue
		for t in chat.llm_response.topics:
			if query.lower() in t.lower():
				results.append(chat)
				break
		else:
			for k in chat.llm_response.keywords:
				if query.lower() in k.lower():
					results.append(chat)
					break
	return results
