from fastapi import APIRouter, HTTPException
from backend.schema.llm_chat_schema import LLMRequest, LLMResponse
from backend.services.llm_service import ask_llm

router = APIRouter()

@router.post("/analyze", response_model=LLMResponse)
def analyze_text(request: LLMRequest):
    if not request.user_message.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    result = ask_llm(request)
    if not result:
        raise HTTPException(status_code=500, detail="Failed to process text")
    
    return result