export type LLMRequest = {
  user_message: string;
  model?: string; // default: "llama-3.3-70b-versatile"
  created_at: string;
  user_id: string;
};

export type LLMResponse = {
  summary: string;
  title?: string | null;
  topics: string[]; // 3 key topics
  sentiment: "positive" | "neutral" | "negative";
  keywords?: string[]; // 3 most frequent nouns
  created_at: string;
};

export type LLMChat = {
  id: string;
  llm_request: LLMRequest;
  llm_response: LLMResponse;
};
