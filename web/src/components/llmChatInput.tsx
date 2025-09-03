import { useState } from "react";
import { Search, Send, Settings2 } from "lucide-react";
import SearchDialog from "./searchDialog";
import { useAnalyze } from "../hooks/useAnalyze";
import { useChatStore } from "../store";
import type { LLMRequest } from "../types/llmChatSchema";

export default function LlmChatInput({
  onSend,
}: {
  onSend?: (msg: string) => void;
}) {
  const [value, setValue] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const addChat = useChatStore((s) => s.addChat);
  const { mutate } = useAnalyze();

  const handleSend = () => {
    try {
      if (!value.trim()) return;
      onSend?.(value);
      const req: LLMRequest = {
        user_message: value,
        model: "llama-3.3-70b-versatile",
        created_at: new Date().toISOString(),
        user_id: "user",
      };
      mutate(req, {
        onSuccess: (res) => {
          addChat({
            id: Math.random().toString(36).slice(2),
            llm_request: req,
            llm_response: res,
          });
        },
      });
      setValue("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex-col px-4 py-2 gap-4 border border-gray-700 rounded">
      <textarea
        className="w-full rounded border-none focus:ring-primary focus:outline-none text-xs"
        placeholder="Type a message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        rows={3}
        maxLength={5000}
      />
      <div className="flex justify-between mt-4">
        <div className="flex gap-2">
          <button onClick={() => setShowSearch(true)}>
            <Search size={16} />
          </button>
          <button>
            <Settings2 size={16} />
          </button>
        </div>
        <button
          className="bg-gray-800/60 p-2 rounded hover:bg-gray-800/80 transition-colors"
          onClick={handleSend}
        >
          <Send size={16} />
        </button>
      </div>
      {showSearch && <SearchDialog onClose={() => setShowSearch(false)} />}
    </div>
  );
}
