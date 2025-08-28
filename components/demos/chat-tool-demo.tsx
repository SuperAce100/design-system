import ChatTool from "@/registry/new-york/blocks/chat-tool/chat-tool";
import { ToolUIPart } from "ai";

const toolMessagePart: ToolUIPart[] = [
  // Tool receiving input stream
  {
    type: "tool-calculator",
    toolCallId: "1",
    state: "input-streaming",
    input: "Calculate the sum of first 6 even numbers",
  },
  // Tool processing input
  {
    type: "tool-calculator",
    toolCallId: "2",
    state: "input-available",
    input: "2 + 4 + 6 + 8 + 10 + 12",
  },
  // Tool completed successfully
  {
    type: "tool-calculator",
    toolCallId: "3",
    state: "output-available",
    input: "2 + 4 + 6 + 8 + 10 + 12",
    output: "42",
  },
  // Tool execution failed
  {
    type: "tool-weather",
    toolCallId: "4",
    state: "output-error",
    input: { location: "invalid-location", unit: "celsius" },
    errorText: "Location 'invalid-location' not found. Please provide a valid city name.",
  },
];

export default function ChatToolDemo() {
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
      {toolMessagePart.map((part) => (
        <ChatTool key={part.toolCallId} toolMessagePart={part} />
      ))}
    </div>
  );
}
