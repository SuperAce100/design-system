"use client";
import ChatReasoning from "@/registry/new-york/blocks/chat-reasoning/chat-reasoning";
import ChatTool from "@/registry/new-york/blocks/chat-tool/chat-tool";
import { ToolUIPart, UIDataTypes, UIMessagePart, UITools } from "ai";

const partsInAccordion: UIMessagePart<UIDataTypes, UITools>[] = [
  {
    type: "reasoning",
    text: "The user is asking for the sum of the first six positive even numbers.",
  },
  {
    type: "tool-calculator",
    toolCallId: "1",
    state: "output-available",
    input: "2 + 4 + 6 + 8 + 10 + 12",
    output: "42",
  },
  {
    type: "reasoning",
    text: "The calculator tool returned the answer 42. Let me return the answer to the user.",
  },
];

export default function ChatReasoningDemo() {
  return (
    <ChatReasoning
      partsInAccordion={partsInAccordion}
      renderMessagePart={(part, key) => {
        if (part.type === "reasoning") {
          return (
            <div key={key} className="text-sm text-muted-foreground">
              {part.text}
            </div>
          );
        } else if (part.type === "tool-calculator") {
          return (
            <ChatTool
              toolMessagePart={part as ToolUIPart}
              className="my-1 border-none px-0 py-0 shadow-none text-muted-foreground pb-1"
            />
          );
        }
      }}
      defaultValue={"reasoning"}
      className="w-full max-w-sm"
    />
  );
}
