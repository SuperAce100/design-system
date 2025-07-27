import ChatMessage, { Message } from "@/registry/new-york/blocks/chat-message/chat-message";

const messages: Message[] = [
  {
    role: "user",
    content: "Hello, how are you?",
  },
  {
    role: "assistant",
    content: "I'm good, thank you!",
  },
  {
    role: "user",
    content: "Tell me about design systems",
  },
  {
    role: "assistant",
    content:
      "# Design Systems\n\nA design system is a **collection of components** that are used to build a design system. It is a collection of components that are used to build a design system. ",
  },
];

export default function ChatMessageDemo() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-lg">
      {messages.map((message) => (
        <ChatMessage key={message.content} message={message} />
      ))}
    </div>
  );
}
