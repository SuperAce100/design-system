import ChatTool from "@/registry/new-york/blocks/chat-tool/chat-tool";
import { ToolUIPart } from "ai";

const toolMessagePart: ToolUIPart[] = [
  {
    type: "tool-calculator",
    toolCallId: "1",
    state: "output-available",
    input: "2 + 4 + 6 + 8 + 10 + 12",
    output: "42",
  },
  {
    type: "tool-calculator",
    toolCallId: "1",
    state: "output-available",
    input: "2 + 4 + 6 + 8 + 10 + 12",
    output: "42",
  },
  {
    type: "tool-calculator",
    toolCallId: "1",
    state: "output-available",
    input: "2 + 4 + 6 + 8 + 10 + 12",
    output: "42",
  },
  {
    type: "tool-calculator",
    toolCallId: "1",
    state: "output-available",
    input: "2 + 4 + 6 + 8 + 10 + 12",
    output: "42",
  },
];

export default function ChatToolDemo() {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {toolMessagePart.map((part) => (
        <ChatTool key={part.toolCallId} toolMessagePart={part} />
      ))}
    </div>
  );
}
