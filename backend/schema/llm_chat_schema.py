from pydantic import BaseModel
from typing import List

class LLMRequest(BaseModel):
    user_message: str
    model:str = "llama-3.3-70b-versatile"
    created_at: str
    user_id: str

class LLMResponse(BaseModel):
    summary: str
    title: str | None = None
    topics: List[str] #3 key topics
    sentiment: str #positive / neutral / negative
    keywords: List[str] = [] # 3 most frequent nouns

    created_at: str


class LLMChat(BaseModel):
    id: str
    llm_request: LLMRequest
    llm_response: LLMResponse