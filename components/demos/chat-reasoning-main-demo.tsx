"use client";

import type { UIDataTypes, UIMessagePart, UITools } from "ai";
import ChatReasoning from "@/registry/new-york/blocks/chat-reasoning/chat-reasoning";

const parts: UIMessagePart<UIDataTypes, UITools>[] = [
  {
    type: "reasoning",
    text: "Checking the last deployment, validating the preview, and preparing a short answer.",
  },
];

export default function ChatReasoningMainDemo() {
  return (
    <ChatReasoning
      partsInAccordion={parts}
      renderMessagePart={(part, key) =>
        part.type === "reasoning" ? (
          <div key={key} className="text-sm text-muted-foreground">
            {part.text}
          </div>
        ) : null
      }
      defaultValue="reasoning"
      className="w-full max-w-sm"
    />
  );
}
