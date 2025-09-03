import type { LLMChat } from "./types/llmChatSchema";
import { create } from "zustand";

interface ChatStore {
  chats: LLMChat[];
  addChat: (chat: LLMChat) => void;
  setChats: (chats: LLMChat[]) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chats: [],
  addChat: (chat: LLMChat) =>
    set((state: ChatStore) => ({ chats: [...state.chats, chat] })),
  setChats: (chats: LLMChat[]) => set(() => ({ chats })),
}));
