import * as React from "react";

import BadgeDemo from "@/components/demos/badge-demo";
import ButtonDemo from "@/components/demos/button-demo";
import RevealDemo from "@/components/demos/reveal-demo";
import CardDemo from "@/components/demos/card-demo";
import DescriptionListDemo from "@/components/demos/description-list-demo";
import PageHeaderDemo from "@/components/demos/page-header-demo";
import MotionBlurTextDemo from "@/components/demos/motion-blur-text";
import WindowDemo from "@/components/demos/window-demo";
import CodeBlockDemo from "@/components/demos/code-block-demo";
import MarkdownDemo from "@/components/demos/markdown-demo";
import InputDemo from "@/components/demos/input-demo";
import TextareaDemo from "@/components/demos/textarea-demo";
import ChatInputDemo from "@/components/demos/chat-input-demo";
import SelectDemo from "@/components/demos/select-demo";
import ChatMessageDemo from "@/components/demos/chat-message-demo";
import JSXPreviewDemo from "@/components/demos/jsx-preview-demo";
import PointerDemo from "@/components/demos/pointer-demo";
import ChatReasoningDemo from "@/components/demos/chat-reasoning-demo";
import ChatToolDemo from "@/components/demos/chat-tool-demo";
import ChatDemo from "@/components/demos/chat-demo";
import InvisibleInputDemo from "@/components/demos/invisible-input-demo";
import CommandPromptDemo from "@/components/demos/command-prompt-demo";
import LoaderDemo from "@/components/demos/loader-demo";

export type ComponentMeta = {
  id: string;
  name: string;
  section: "Primitives" | "AI" | "Effects";
  description: string;
};

export const sectionOrder: ComponentMeta["section"][] = ["Primitives", "AI", "Effects"];

export const componentList: ComponentMeta[] = [
  {
    id: "window",
    name: "Window",
    section: "Primitives",
    description: "A draggable, resizable window inside a container.",
  },
  {
    id: "badge",
    name: "Badge",
    section: "Primitives",
    description: "A clean set of badge components with an edible look.",
  },
  {
    id: "button",
    name: "Button",
    section: "Primitives",
    description: "A button component that *feels* good to use.",
  },
  {
    id: "code-block",
    name: "Code Block",
    section: "Primitives",
    description: "A code block with syntax highlighting and quick copying.",
  },
  {
    id: "markdown",
    name: "Markdown",
    section: "Primitives",
    description: "A markdown component with a clean look and no-frills parsing.",
  },
  {
    id: "select",
    name: "Select",
    section: "Primitives",
    description: "A lightly skinned select component.",
  },
  {
    id: "input",
    name: "Input",
    section: "Primitives",
    description: "A simple input component with a tactile feel.",
  },
  {
    id: "command-prompt",
    name: "Command Prompt",
    section: "Primitives",
    description: "A keyboard-first command prompt with history and autocomplete.",
  },
  {
    id: "invisible-input",
    name: "Invisible Input",
    section: "Primitives",
    description: "An unstyled input that looks like text; fully styleable.",
  },
  {
    id: "textarea",
    name: "Textarea",
    section: "Primitives",
    description: "An input that can increase in height to accommodate more text.",
  },
  {
    id: "card",
    name: "Card",
    section: "Primitives",
    description: "A variety of clean cards, from minimal to flashy.",
  },
  {
    id: "description-list",
    name: "Description List",
    section: "Primitives",
    description: "Quickly display a json object in an aesthetically pleasing way.",
  },
  {
    id: "page-header",
    name: "Page Header",
    section: "Primitives",
    description: "A clean page header so your pages look consistent.",
  },
  {
    id: "chat",
    name: "Chat",
    section: "AI",
    description:
      "A full chat component with tool calling, reasoning, etc. using the AI SDK. Just add an OpenAI key.",
  },
  {
    id: "chat-input",
    name: "Chat Input",
    section: "AI",
    description:
      "A chat input component with status indicators, model selection, and more. Ready for useChat().",
  },
  {
    id: "chat-message",
    name: "Chat Message",
    section: "AI",
    description: "A configurable chat message including markdown support, tool calls, etc.",
  },
  {
    id: "chat-reasoning",
    name: "Reasoning",
    section: "AI",
    description:
      "A chat reasoning component that automatically collapses, contains tool calls, and more.",
  },
  {
    id: "chat-tool",
    name: "Tool Call",
    section: "AI",
    description:
      "A component that displays tool calls as they stream in in a nice collapsible display.",
  },
  {
    id: "jsx-preview",
    name: "JSX Preview",
    section: "AI",
    description:
      "A preview of a JSX component rendered from a string. Useful for LLM-generated UIs.",
  },
  {
    id: "pointer",
    name: "Pointer",
    section: "AI",
    description: "A controllable on-screen pointer that moves to coordinates and shows thoughts.",
  },
  {
    id: "reveal",
    name: "Reveal",
    section: "Effects",
    description: "A simple wrapper that animates content when it scrolls into view.",
  },
  {
    id: "motion-blur-text",
    name: "Motion Blur Text",
    section: "Effects",
    description: "A motion blur text effect that can be used to show motion.",
  },
  {
    id: "loader",
    name: "Loader",
    section: "Primitives",
    description: "A collection of elegant loading indicators with progress support.",
  },
];

const demoMap: Record<string, React.ReactNode> = {
  window: <WindowDemo />,
  badge: <BadgeDemo />,
  button: <ButtonDemo />,
  "code-block": <CodeBlockDemo />,
  markdown: <MarkdownDemo />,
  select: <SelectDemo />,
  input: <InputDemo />,
  "command-prompt": <CommandPromptDemo />,
  "invisible-input": <InvisibleInputDemo />,
  textarea: <TextareaDemo />,
  card: <CardDemo />,
  "description-list": <DescriptionListDemo />,
  "page-header": <PageHeaderDemo />,
  "chat-input": <ChatInputDemo />,
  "chat-message": <ChatMessageDemo />,
  "chat-reasoning": <ChatReasoningDemo />,
  "chat-tool": <ChatToolDemo />,
  chat: <ChatDemo />,
  "jsx-preview": <JSXPreviewDemo />,
  pointer: <PointerDemo />,
  reveal: <RevealDemo />,
  "motion-blur-text": <MotionBlurTextDemo />,
  loader: <LoaderDemo />,
};

export function getDemoById(id: string): React.ReactNode | null {
  return demoMap[id] ?? null;
}

export function getComponentMeta(id: string): ComponentMeta | undefined {
  return componentList.find((c) => c.id === id);
}

export function getAllComponentIds(): string[] {
  return componentList.map((c) => c.id);
}
