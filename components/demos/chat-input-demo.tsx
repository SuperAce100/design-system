"use client";

import ChatInput from "@/registry/new-york/blocks/chat-input/chat-input";
import { useState } from "react";

const models = [
  { id: "gpt-4.1", name: "GPT-4.1", description: "OpenAI's most powerful non-thinking model." },
  {
    id: "o3",
    name: "o3",
    description: "OpenAI's most powerful model. Feel the AGI.",
  },
  {
    id: "claude-3-7-sonnet",
    name: "Claude Sonnet 4",
    description: "Great for coding, writing, and structured tasks",
  },
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
