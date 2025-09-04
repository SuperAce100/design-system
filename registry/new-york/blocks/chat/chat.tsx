"use client";

import * as React from "react";
import ChatMessage from "@/registry/new-york/blocks/chat-message/chat-message";
import ChatInput from "@/registry/new-york/blocks/chat-input/chat-input";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, UIMessage } from "ai";
import { cn } from "@/lib/utils";
import { AlertTriangle, Loader } from "lucide-react";

export default function Chat({
  defaultModel = "gpt-5-nano",
  className,
}: {
  defaultModel?: string;
  className?: string;
}) {
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const [input, setInput] = React.useState<string>("");
  const models = React.useMemo(
    () => [
      { id: "gpt-5", name: "GPT-5", description: "Reasoning-capable, efficient" },
      { id: "gpt-5-mini", name: "GPT-5 mini", description: "Fast and affordable" },
      { id: "gpt-5-nano", name: "GPT-5 nano", description: "Reasoning-capable, efficient" },
    ],
    []
  );
  const [model, setModel] = React.useState<string>(defaultModel || models[0]?.id);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input.trim() }, { body: { model } });
    setInput("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto h-[calc(100%-48px)] pb-12 px-2">
        {messages.map((m: UIMessage) => (
          <ChatMessage key={m.id} message={m} />
        ))}
      </div>

      {status === "streaming" && (
        <div className="text-sm text-muted-foreground">
          <Loader className="size-4 animate-spin" />
        </div>
      )}

      {status === "error" && error && (
        <div className="text-destructive text-sm flex items-center gap-2 px-4 py-2 rounded-md bg-destructive/10">
          <AlertTriangle className="size-4" />
          {error.message}
        </div>
      )}

      <ChatInput
        title=""
        placeholder="Ask the UI builder..."
        models={models}
        allowFileUpload={false}
        loading={status === "streaming"}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        input={input}
        className="absolute bottom-0"
        model={model}
        onModelChange={setModel}
      />
    </div>
  );
}
