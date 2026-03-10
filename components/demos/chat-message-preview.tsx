import ChatMessage from "@/registry/new-york/blocks/chat-message/chat-message";
import { UIMessage } from "ai";

const message: UIMessage = {
  id: "1",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "A **design system** is a collection of reusable components that help teams build consistent interfaces.",
    },
  ],
};

export default function ChatMessagePreview() {
  return <ChatMessage message={message} />;
}
