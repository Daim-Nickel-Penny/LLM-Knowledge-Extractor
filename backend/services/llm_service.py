import os
import json
import datetime

import uuid
from backend.schema.llm_chat_schema import LLMChat
from backend.schema.db import add_chat

from groq import Groq

from backend.schema.llm_chat_schema import LLMRequest
from backend.schema.llm_chat_schema import LLMResponse
from backend.services.keyword_service import extract_keywords

SYSTEM_PROMPT = """You are an expert text analyzer. When given a block of unstructured text, analyze it and respond ONLY with a valid JSON object in this exact format.
{
  "summary": "A concise 1-2 sentence summary of the text.",
  "title": "The inferred title of the text, or null if none is apparent.",
  "topics": ["topic1", "topic2", "topic3"],  // Exactly 3 key topics as strings
  "sentiment": "positive" | "neutral" | "negative"  // One of these three values
}
Do not include any extra text, explanations, or markdown outside the JSON.
Do not include any backticks or any other characters or any comments.
Response should be valid JSON.
"""


def groq_init():
    try:
        client = Groq(
            api_key=os.environ.get("GROQ_API_KEY"),
        )

        return client
    
    except Exception as e:
        print("Error initializing Groq client:", e)
        return None


def formatUserMessage(llm_request: LLMRequest) -> str:
    return f"<RAW_TEXT>{llm_request.user_message}</RAW_TEXT>"

def parse_llm_content(contents: str | None) -> LLMResponse | None:
    if not contents:
        return None
    try:
        response = json.loads(contents)
        response['created_at'] = datetime.datetime.now().isoformat()
        return LLMResponse(**response)
    except json.JSONDecodeError as e:
        print("Error parsing LLM content:", e)
        return None


def ask_llm(llm_request: LLMRequest) -> LLMResponse | None:
    try:
        client = groq_init()


        if not client:
            return None
        
        if not llm_request.user_message.strip():
            raise ValueError("User message is empty")

        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT,
                },
                {
                    "role": "user",
                    "content": llm_request.user_message,
                }
            ],
            model=llm_request.model,
        )

        contents = chat_completion.choices[0].message.content
        llm_response = parse_llm_content(contents)

        if llm_response:
            llm_response.keywords = extract_keywords(llm_request.user_message)
            chat_id = str(uuid.uuid4())
            chat = LLMChat(id=chat_id, llm_request=llm_request, llm_response=llm_response)
            add_chat(chat)
        return llm_response

    except Exception as e:
        print("Error asking LLM:", e)
        return None