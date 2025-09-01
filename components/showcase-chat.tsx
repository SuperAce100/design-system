"use client";
import * as React from "react";
import ChatMessage from "@/registry/new-york/blocks/chat-message/chat-message";
import ChatInput from "@/registry/new-york/blocks/chat-input/chat-input";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

export default function ShowcaseChat({
  defaultModel = "gpt-5-nano",
  className,
}: {
  defaultModel?: string;
  className?: string;
}) {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const [input, setInput] = React.useState<string>("");
  const models = React.useMemo(
    () => [
      { id: "gpt-5-nano", name: "GPT-5 nano", description: "Reasoning-capable, efficient" },
      { id: "gpt-4o-mini", name: "GPT-4o mini", description: "Fast and affordable" },
    ],
    []
  );
  const [model, setModel] = React.useState<string>(defaultModel || models[0]?.id);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({ text: input.trim() });
    setInput("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className={className}>
      <div className="text-sm text-muted-foreground">Chat</div>
      <div className="flex flex-col gap-2">
        {messages.map((m: any) => (
          <ChatMessage key={m.id} message={m} />
        ))}
      </div>
      <ChatInput
        title=""
        placeholder="Ask the UI builder..."
        models={models}
        allowFileUpload={false}
        loading={status === "streaming"}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        input={input}
        className="mt-2"
        model={model}
        onModelChange={setModel}
      />
    </div>
  );
}
