import type { ToolUIPart } from "ai";
import ChatTool from "@/registry/new-york/blocks/chat-tool/chat-tool";

const toolMessagePart: ToolUIPart = {
  type: "tool-calculator",
  toolCallId: "calc-1",
  state: "output-available",
  input: "12 + 8",
  output: "20",
};

export default function ChatToolMainDemo() {
  return (
    <div className="w-full max-w-sm">
      <ChatTool toolMessagePart={toolMessagePart} />
    </div>
  );
}
