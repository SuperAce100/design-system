import ChatTool from "@/registry/new-york/blocks/chat-tool/chat-tool";
import { ToolUIPart } from "ai";

const toolPart: ToolUIPart = {
  type: "tool-calculator",
  toolCallId: "1",
  state: "output-available",
  input: "2 + 4 + 6 + 8 + 10 + 12",
  output: "42",
};

export default function ChatToolMain() {
  return <ChatTool toolMessagePart={toolPart} />;
}
