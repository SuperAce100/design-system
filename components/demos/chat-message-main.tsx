import ChatMessage from "@/registry/new-york/blocks/chat-message/chat-message";
import { UIMessage } from "ai";

const messages: UIMessage[] = [
  {
    id: "1",
    role: "user",
    parts: [{ type: "text", text: "What is a design system?" }],
  },
  {
    id: "2",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "A **design system** is a collection of reusable components, guidelines, and standards that help teams build consistent user interfaces efficiently.",
      },
    ],
  },
];

export default function ChatMessageMain() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
}
