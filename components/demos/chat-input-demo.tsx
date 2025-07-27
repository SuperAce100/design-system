"use client";

import ChatInput from "@/registry/new-york/blocks/chat-input/chat-input";
import { useState } from "react";

const models = [
  { id: "gpt-4o", name: "GPT-4o", description: "GPT-4o" },
  { id: "claude-3-7-sonnet", name: "Claude 3.7 Sonnet", description: "Claude 3.7 Sonnet" },
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    description: "Google's most powerful reasoning model",
  },
];

export default function ChatInputDemo() {
  const [input, setInput] = useState("");
  const [model, setModel] = useState("gpt-4o");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  return (
    <ChatInput
      title="Chat Input"
      placeholder="Type something..."
      models={models}
      allowFileUpload={false}
      loading={loading}
      handleSubmit={handleSubmit}
      handleInputChange={(e) => setInput(e.target.value)}
      input={input}
      model={model}
      onModelChange={(value) => setModel(value)}
    />
  );
}
