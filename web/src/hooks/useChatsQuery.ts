import { useQuery } from "@tanstack/react-query";
import type { LLMChat } from "../types/llmChatSchema";

export function useChatsQuery() {
  return useQuery<LLMChat[], Error>({
    queryKey: ["chats"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/chats");
      if (!res.ok) throw new Error("Failed to fetch chats");
      return await res.json();
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
