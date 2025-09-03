import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LlmChatRequest from "./llmChatRequest";
import LlmChatResponse from "./llmChatResponse";

export default function SearchDialog({ onClose }: { onClose?: () => void }) {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["search", search],
    queryFn: async () => {
      if (!search) return [];
      const res = await fetch(
        `http://localhost:8000/search?query=${encodeURIComponent(search)}`
      );
      return res.json();
    },
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className="bg-gray-800 rounded-xl p-6 w-full max-w-lg"
        style={{ height: 500 }}
      >
        <input
          className="w-full p-2 border rounded mb-4 outline-none"
          placeholder="Type to search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setSearch(query);
          }}
        />
        {isLoading && <div className="text-center">Loading...</div>}
        <div className="space-y-4 overflow-y-auto" style={{ maxHeight: 350 }}>
          {data?.map((chat: any) => (
            <div
              key={chat.id}
              className="border rounded p-2 text-xs bg-gray-800"
            >
              <div className="font-bold mb-1">{chat.llm_response.title}</div>
              <div className="mb-1">{chat.llm_response.summary}</div>
              <div className="mb-1 text-gray-600">
                Topics: {chat.llm_response.topics?.join(", ")}
              </div>
              <div className="mb-1 text-gray-600">
                Sentiment: {chat.llm_response.sentiment}
              </div>
              <div className="mb-1 text-gray-600">
                Keywords: {chat.llm_response.keywords?.join(", ")}
              </div>
              <div className="mt-2 text-gray-400">
                User: {chat.llm_request.user_message}
              </div>
            </div>
          ))}
        </div>
        <button
          className="w-full mt-4 py-2 bg-red-500 text-white rounded font-bold"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
