import * as React from "react";
import { HelloWorld } from "@/registry/new-york/blocks/hello-world/hello-world";
import { ExampleForm } from "@/registry/new-york/blocks/example-form/example-form";
import PokemonPage from "@/registry/new-york/blocks/complex-component/page";
import { ExampleCard } from "@/registry/new-york/blocks/example-with-css/example-card";
import ComponentFrame from "@/components/component-frame";
import BadgeDemo from "@/components/demos/badge-demo";
import ButtonDemo from "@/components/demos/button-demo";
import RevealDemo from "@/components/demos/reveal-demo";
import CardDemo from "@/components/demos/card-demo";
import DescriptionListDemo from "@/components/demos/description-list-demo";
import PageHeaderDemo from "@/components/demos/page-header-demo";
import MotionBlurTextDemo from "@/components/demos/motion-blur-text";
import CodeBlockDemo from "@/components/demos/code-block-demo";
import { Button } from "@/registry/new-york/blocks/button/button";
import Link from "next/link";
import MarkdownDemo from "@/components/demos/markdown-demo";
import InputDemo from "@/components/demos/input-demo";
import TextareaDemo from "@/components/demos/textarea-demo";
import ChatInputDemo from "@/components/demos/chat-input-demo";
import SelectDemo from "@/components/demos/select-demo";
import ChatMessageDemo from "@/components/demos/chat-message-demo";
import JSXPreviewDemo from "@/components/demos/jsx-preview-demo";
// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

const components = [
  {
    id: "jsx-preview",
    name: "JSX Preview",
    description:
      "A preview of a JSX component rendered from a string. Useful for LLM-generated UIs.",
    demo: <JSXPreviewDemo />,
  },
  {
    id: "select",
    name: "Select",
    description: "A lightly skinned select component.",
    demo: <SelectDemo />,
  },
  {
    id: "input",
    name: "Input",
    description: "A simple input component with a tactile feel.",
    demo: <InputDemo />,
  },
  {
    id: "textarea",
    name: "Textarea",
    description: "An input that can increase in height to accommodate more text.",
    demo: <TextareaDemo />,
  },
  {
    id: "chat-input",
    name: "Chat Input",
    description: "A chat input component for a nice chatbot experience. Ready for useChat().",
    demo: <ChatInputDemo />,
  },
  {
    id: "chat-message",
    name: "Chat Message",
    description:
      "A chat message component compatible with the Vercel AI SDK including markdown support, copying, etc.",
    demo: <ChatMessageDemo />,
  },
  {
    id: "badge",
    name: "Badge",
    description: "A clean set of badge components with an edible look.",
    demo: <BadgeDemo />,
  },
  {
    id: "button",
    name: "Button",
    description: "A button component that *feels* good to use.",
    demo: <ButtonDemo />,
  },
  {
    id: "reveal",
    name: "Reveal",
    description: "A simple wrapper that reveals content when it scrolls into view.",
    demo: <RevealDemo />,
  },
  {
    id: "card",
    name: "Card",
    description: "A variety of clean cards, from minimal to flashy.",
    demo: <CardDemo />,
  },
  {
    id: "description-list",
    name: "Description List",
    description: "Quickly display a json object in an aesthetically pleasing way.",
    demo: <DescriptionListDemo />,
  },
  {
    id: "page-header",
    name: "Page Header",
    description: "A clean page header so your pages look consistent.",
    demo: <PageHeaderDemo />,
  },
  {
    id: "motion-blur-text",
    name: "Motion Blur Text",
    description: "A cool motion blur text effect.",
    demo: <MotionBlurTextDemo />,
  },
  {
    id: "code-block",
    name: "Code Block",
    description: "A code block with syntax highlighting and quick copying.",
    demo: <CodeBlockDemo />,
  },
  {
    id: "markdown",
    name: "Markdown",
    description: "A markdown component with a clean look and no-frills parsing.",
    demo: <MarkdownDemo />,
  },
];

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl mt-8 font-semibold tracking-tight">Asanshay's Components</h1>
        <p className="text-muted-foreground text-lg">
          A set of components I've built. Designed to be flexible, LLM-friendly, and functional
          while still being beautiful.
        </p>
        <div className="flex gap-2 flex-row flex-wrap items-end">
          {components.map((component) => (
            <Button variant="link" size="xs" asChild key={component.id}>
              <Link href={`#${component.id}`}>{component.name}</Link>
            </Button>
          ))}
        </div>
      </header>
      <main className="flex flex-col flex-1 gap-8">
        {components.map((component) => (
          <ComponentFrame
            key={component.id}
            title={component.name}
            id={component.id}
            componentName={component.id}
            description={component.description}
          >
            {component.demo}
          </ComponentFrame>
        ))}
      </main>
    </div>
  );
}
