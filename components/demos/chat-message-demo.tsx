"use client";
import ChatMessage from "@/registry/new-york/blocks/chat-message/chat-message";
import { UIMessage } from "ai";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/blocks/select/select";

const messages: UIMessage[] = [
  {
    id: "1",
    role: "user",
    parts: [
      {
        type: "text",
        text: "Hello, how are you?",
      },
    ],
  },
  {
    id: "2",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "I'm good, thank you!",
      },
    ],
  },
  {
    id: "3",
    role: "user",
    parts: [
      {
        type: "text",
        text: "Tell me about design systems",
      },
    ],
  },
  {
    id: "4",
    role: "assistant",
    parts: [
      {
        type: "reasoning",
        text: "I'm thinking about design systems and I'm going to use the web_search tool to help me.",
      },
      {
        type: "dynamic-tool",
        toolName: "web_search",
        toolCallId: "1",
        input: {
          query: "what is a design system?",
        },
        output: {
          results: [
            "A design system is a **collection of components** that are used to build a design system. It is a collection of components that are used to build a design system. ",
          ],
        },
        state: "output-available",
      },
      {
        type: "reasoning",
        text: "Now I'm going to return the results of the web_search tool to the user.",
      },
      {
        type: "text",
        text: "# Design Systems\n\nA design system is a **collection of components** that are used to build a design system. It is a collection of components that are used to build a design system. ",
      },
    ],
  },
];

export default function ChatMessageDemo() {
  const [userMessageVariant, setUserMessageVariant] = useState<string>("default");
  const [assistantMessageVariant, setAssistantMessageVariant] = useState<string>("default");

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Variant Controls */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-muted-foreground">User</label>
          <Select className="w-[120px]" value={userMessageVariant} onValueChange={setUserMessageVariant}>
            <SelectTrigger size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["default", "raised", "title"].map((variant) => (
                <SelectItem key={variant} value={variant}>
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-muted-foreground">Assistant</label>
          <Select className="w-[120px]" value={assistantMessageVariant} onValueChange={setAssistantMessageVariant}>
            <SelectTrigger size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["default", "raised", "paragraph"].map((variant) => (
                <SelectItem key={variant} value={variant}>
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            userMessageVariant={userMessageVariant as "default" | "raised" | "title"}
            assistantMessageVariant={assistantMessageVariant as "default" | "raised" | "paragraph"}
            className="transition-all"
          />
        ))}
      </div>
    </div>
  );
}
