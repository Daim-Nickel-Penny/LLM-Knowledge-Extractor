import type { LLMResponse } from "../types/llmChatSchema";
export default function LlmChatResponse({ res }: { res: LLMResponse }) {
  return (
    <div className="text-xs text-white bg-white/20 p-4 w-1/2 rounded-2xl">
      <div>{res.summary}</div>
      {res.title && <div className="italic">{res.title}</div>}
      <div className="bg-blue-500/20 p-4 rounded-2xl mt-4 w-1/3">
        <div>Topics: {res.topics.join(", ")}</div>
        <div>Sentiment: {res.sentiment}</div>
        {res.keywords && <div>Keywords: {res.keywords.join(", ")}</div>}
      </div>
    </div>
  );
}
