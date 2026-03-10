import * as React from "react";

import AsciiWaveDemo from "@/components/demos/ascii-wave-demo";
import AsciiWaveMainDemo from "@/components/demos/ascii-wave-main-demo";
import BadgeDemo from "@/components/demos/badge-demo";
import BadgeMainDemo from "@/components/demos/badge-main-demo";
import ButtonDemo from "@/components/demos/button-demo";
import ButtonMainDemo from "@/components/demos/button-main-demo";
import CardDemo from "@/components/demos/card-demo";
import CardMainDemo from "@/components/demos/card-main-demo";
import ChatDemo from "@/components/demos/chat-demo";
import ChatMainDemo from "@/components/demos/chat-main-demo";
import ChatInputDemo from "@/components/demos/chat-input-demo";
import ChatInputMainDemo from "@/components/demos/chat-input-main-demo";
import ChatMessageDemo from "@/components/demos/chat-message-demo";
import ChatMessageMainDemo from "@/components/demos/chat-message-main-demo";
import ChatReasoningDemo from "@/components/demos/chat-reasoning-demo";
import ChatReasoningMainDemo from "@/components/demos/chat-reasoning-main-demo";
import ChatToolDemo from "@/components/demos/chat-tool-demo";
import ChatToolMainDemo from "@/components/demos/chat-tool-main-demo";
import CodeBlockDemo from "@/components/demos/code-block-demo";
import CodeBlockMainDemo from "@/components/demos/code-block-main-demo";
import ColorPickerDemo from "@/components/demos/color-picker-demo";
import ColorPickerMainDemo from "@/components/demos/color-picker-main-demo";
import CommandPromptDemo from "@/components/demos/command-prompt-demo";
import CommandPromptMainDemo from "@/components/demos/command-prompt-main-demo";
import DescriptionListDemo from "@/components/demos/description-list-demo";
import DescriptionListMainDemo from "@/components/demos/description-list-main-demo";
import InputDemo from "@/components/demos/input-demo";
import InputMainDemo from "@/components/demos/input-main-demo";
import InvisibleInputDemo from "@/components/demos/invisible-input-demo";
import InvisibleInputMainDemo from "@/components/demos/invisible-input-main-demo";
import JSXPreviewDemo from "@/components/demos/jsx-preview-demo";
import JSXPreviewMainDemo from "@/components/demos/jsx-preview-main-demo";
import LoaderDemo from "@/components/demos/loader-demo";
import LoaderMainDemo from "@/components/demos/loader-main-demo";
import LongPressButtonDemo from "@/components/demos/long-press-button-demo";
import LongPressButtonMainDemo from "@/components/demos/long-press-button-main-demo";
import MarkdownDemo from "@/components/demos/markdown-demo";
import MarkdownMainDemo from "@/components/demos/markdown-main-demo";
import MorphingTextDemo from "@/components/demos/morphing-text-demo";
import MorphingTextMainDemo from "@/components/demos/morphing-text-main-demo";
import MotionBlurTextDemo from "@/components/demos/motion-blur-text";
import MotionBlurTextMainDemo from "@/components/demos/motion-blur-text-main-demo";
import NumberInputDemo from "@/components/demos/number-input-demo";
import NumberInputMainDemo from "@/components/demos/number-input-main-demo";
import PageHeaderDemo from "@/components/demos/page-header-demo";
import PageHeaderMainDemo from "@/components/demos/page-header-main-demo";
import PointerDemo from "@/components/demos/pointer-demo";
import PointerMainDemo from "@/components/demos/pointer-main-demo";
import RevealDemo from "@/components/demos/reveal-demo";
import RevealMainDemo from "@/components/demos/reveal-main-demo";
import SelectDemo from "@/components/demos/select-demo";
import SelectMainDemo from "@/components/demos/select-main-demo";
import TextareaDemo from "@/components/demos/textarea-demo";
import TextareaMainDemo from "@/components/demos/textarea-main-demo";
import WindowDemo from "@/components/demos/window-demo";
import WindowMainDemo from "@/components/demos/window-main-demo";

export type ComponentPageDemo = {
  slug: string;
  title: string;
  description: string;
  demo: React.ReactNode;
  sourcePath: string;
};

type ComponentDemoDefinition = {
  preview: React.ReactNode;
  docs: [ComponentPageDemo, ComponentPageDemo];
};

type ShowcaseCopy = {
  title?: string;
  description?: string;
};

const defaultMainDescription = "A minimal starting point for the component.";
const defaultShowcaseTitle = "Showcase";
const defaultShowcaseDescription =
  "A richer example that highlights additional states, styling, or composition.";

const legacySourcePathMap: Record<string, string> = {
  "motion-blur-text": "components/demos/motion-blur-text.tsx",
};

const showcaseCopy: Record<string, ShowcaseCopy> = {
  badge: {
    title: "Variants",
    description: "Compare badge variants, colors, icons, and dot styles.",
  },
  button: {
    title: "Variants",
    description: "Browse the full set of button styles in one place.",
  },
  card: {
    title: "Variants",
    description: "See how the card variants change depth, borders, and emphasis.",
  },
  "chat-message": {
    title: "Conversation variants",
    description: "Compare user and assistant message treatments with richer content.",
  },
  "chat-reasoning": {
    title: "Reasoning with tools",
    description: "Combine reasoning output with tool call content in the same accordion.",
  },
  "chat-tool": {
    title: "Tool states",
    description: "Review streaming, running, success, and error states for tool calls.",
  },
  "color-picker": {
    title: "Formats and presets",
    description: "Show format switching, alpha support, and Tailwind preset colors.",
  },
  "command-prompt": {
    title: "Overlay prompt",
    description: "A larger, command-palette style prompt for global actions.",
  },
  "description-list": {
    title: "Layouts",
    description: "Compare the default and stacked description list layouts.",
  },
  loader: {
    title: "Shapes and styles",
    description: "Browse the built-in loader shapes and shader styles.",
  },
  "page-header": {
    title: "Compositions",
    description: "Combine descriptions and actions to build fuller page headers.",
  },
};

function getLegacySourcePath(id: string) {
  return legacySourcePathMap[id] ?? `components/demos/${id}-demo.tsx`;
}

function createComponentDemoDefinition(
  id: string,
  preview: React.ReactNode,
  main: React.ReactNode
): ComponentDemoDefinition {
  const copy = showcaseCopy[id] ?? {};

  return {
    preview,
    docs: [
      {
        slug: "basic",
        title: "Basic",
        description: defaultMainDescription,
        demo: main,
        sourcePath: `components/demos/${id}-main-demo.tsx`,
      },
      {
        slug: "showcase",
        title: copy.title ?? defaultShowcaseTitle,
        description: copy.description ?? defaultShowcaseDescription,
        demo: preview,
        sourcePath: getLegacySourcePath(id),
      },
    ],
  };
}

const componentDemoMap: Record<string, ComponentDemoDefinition> = {
  window: createComponentDemoDefinition("window", <WindowDemo />, <WindowMainDemo />),
  badge: createComponentDemoDefinition("badge", <BadgeDemo />, <BadgeMainDemo />),
  button: createComponentDemoDefinition("button", <ButtonDemo />, <ButtonMainDemo />),
  "long-press-button": createComponentDemoDefinition(
    "long-press-button",
    <LongPressButtonDemo />,
    <LongPressButtonMainDemo />
  ),
  "code-block": createComponentDemoDefinition("code-block", <CodeBlockDemo />, <CodeBlockMainDemo />),
  markdown: createComponentDemoDefinition("markdown", <MarkdownDemo />, <MarkdownMainDemo />),
  select: createComponentDemoDefinition("select", <SelectDemo />, <SelectMainDemo />),
  input: createComponentDemoDefinition("input", <InputDemo />, <InputMainDemo />),
  "number-input": createComponentDemoDefinition("number-input", <NumberInputDemo />, <NumberInputMainDemo />),
  "command-prompt": createComponentDemoDefinition(
    "command-prompt",
    <CommandPromptDemo />,
    <CommandPromptMainDemo />
  ),
  "invisible-input": createComponentDemoDefinition(
    "invisible-input",
    <InvisibleInputDemo />,
    <InvisibleInputMainDemo />
  ),
  textarea: createComponentDemoDefinition("textarea", <TextareaDemo />, <TextareaMainDemo />),
  card: createComponentDemoDefinition("card", <CardDemo />, <CardMainDemo />),
  "description-list": createComponentDemoDefinition(
    "description-list",
    <DescriptionListDemo />,
    <DescriptionListMainDemo />
  ),
  "page-header": createComponentDemoDefinition("page-header", <PageHeaderDemo />, <PageHeaderMainDemo />),
  chat: createComponentDemoDefinition("chat", <ChatDemo />, <ChatMainDemo />),
  "chat-input": createComponentDemoDefinition("chat-input", <ChatInputDemo />, <ChatInputMainDemo />),
  "chat-message": createComponentDemoDefinition("chat-message", <ChatMessageDemo />, <ChatMessageMainDemo />),
  "chat-reasoning": createComponentDemoDefinition(
    "chat-reasoning",
    <ChatReasoningDemo />,
    <ChatReasoningMainDemo />
  ),
  "chat-tool": createComponentDemoDefinition("chat-tool", <ChatToolDemo />, <ChatToolMainDemo />),
  "jsx-preview": createComponentDemoDefinition("jsx-preview", <JSXPreviewDemo />, <JSXPreviewMainDemo />),
  pointer: createComponentDemoDefinition("pointer", <PointerDemo />, <PointerMainDemo />),
  reveal: createComponentDemoDefinition("reveal", <RevealDemo />, <RevealMainDemo />),
  "motion-blur-text": createComponentDemoDefinition(
    "motion-blur-text",
    <MotionBlurTextDemo />,
    <MotionBlurTextMainDemo />
  ),
  loader: createComponentDemoDefinition("loader", <LoaderDemo />, <LoaderMainDemo />),
  "morphing-text": createComponentDemoDefinition("morphing-text", <MorphingTextDemo />, <MorphingTextMainDemo />),
  "ascii-wave": createComponentDemoDefinition("ascii-wave", <AsciiWaveDemo />, <AsciiWaveMainDemo />),
  "color-picker": createComponentDemoDefinition("color-picker", <ColorPickerDemo />, <ColorPickerMainDemo />),
};

export function getPreviewDemoById(id: string): React.ReactNode | null {
  return componentDemoMap[id]?.preview ?? null;
}

export function getComponentPageDemos(id: string): ComponentPageDemo[] {
  return componentDemoMap[id]?.docs ?? [];
}
