import type { UIMessage } from "ai";
import ChatMessage from "@/registry/new-york/blocks/chat-message/chat-message";

const message: UIMessage = {
  id: "assistant-message",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "Your release is ready. Three components were updated and the preview build passed.",
    },
  ],
};

export default function ChatMessageMainDemo() {
  return (
    <div className="w-full max-w-lg">
      <ChatMessage message={message} />
    </div>
  );
}
