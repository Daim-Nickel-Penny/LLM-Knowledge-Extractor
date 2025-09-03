import { useMutation } from "@tanstack/react-query";
import type { LLMRequest, LLMResponse } from "../types/llmChatSchema";

export function useAnalyze() {
  return useMutation({
    mutationFn: async (data: LLMRequest) => {
      const res = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to analyze");
      return (await res.json()) as LLMResponse;
    },
  });
}
