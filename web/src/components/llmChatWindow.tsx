import React, { useEffect } from "react";
import LlmChatInput from "./llmChatInput";
import { useChatStore } from "../store";
import { useChatsQuery } from "../hooks/useChatsQuery";
import LlmChatRequest from "./llmChatRequest";
import LlmChatResponse from "./llmChatResponse";

export default function LlmChatWindow() {
  const chats = useChatStore((s) => s.chats);
  const setChats = useChatStore((s) => s.setChats);
  const { data, isSuccess } = useChatsQuery();

  useEffect(() => {
    if (isSuccess && data) {
      setChats(data);
    }
  }, [isSuccess, data, setChats]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {chats.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-gray-400">
            Please enter a message to start the chat.
          </div>
        ) : (
          chats.map((c) => (
            <div key={c.id} className="mb-4">
              <LlmChatRequest msg={c.llm_request.user_message} />
              <LlmChatResponse res={c.llm_response} />
            </div>
          ))
        )}
      </div>
      <div className="border-t p-2">
        <LlmChatInput />
      </div>
    </div>
  );
}
