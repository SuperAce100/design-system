import ChatMessage from "@/registry/new-york/blocks/chat-message/chat-message";
import { UIMessage } from "ai";

const messages: UIMessage[] = [
  {
    id: "1",
    role: "user",
    parts: [
      {
        type: "text",
        text: "Hello, how are you?",
      },
    ],
  },
  {
    id: "2",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "I'm good, thank you!",
      },
    ],
  },
  {
    id: "3",
    role: "user",
    parts: [
      {
        type: "text",
        text: "Tell me about design systems",
      },
    ],
  },
  {
    id: "4",
    role: "assistant",
    parts: [
      {
        type: "reasoning",
        text: "I'm thinking about design systems and I'm going to use the web_search tool to help me.",
      },
      {
        type: "dynamic-tool",
        toolName: "web_search",
        toolCallId: "1",
        input: {
          query: "what is a design system?",
        },
        output: {
          results: [
            "A design system is a **collection of components** that are used to build a design system. It is a collection of components that are used to build a design system. ",
          ],
        },
        state: "output-available",
      },
      {
        type: "reasoning",
        text: "Now I'm going to return the results of the web_search tool to the user.",
      },
      {
        type: "text",
        text: "# Design Systems\n\nA design system is a **collection of components** that are used to build a design system. It is a collection of components that are used to build a design system. ",
      },
    ],
  },
];

export default function ChatMessageDemo() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-lg">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
}
