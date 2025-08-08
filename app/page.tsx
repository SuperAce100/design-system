import * as React from "react";
import ComponentFrame from "@/components/component-frame";
import BadgeDemo from "@/components/demos/badge-demo";
import ButtonDemo from "@/components/demos/button-demo";
import RevealDemo from "@/components/demos/reveal-demo";
import CardDemo from "@/components/demos/card-demo";
import DescriptionListDemo from "@/components/demos/description-list-demo";
import PageHeaderDemo from "@/components/demos/page-header-demo";
import MotionBlurTextDemo from "@/components/demos/motion-blur-text";
import WindowDemo from "@/components/demos/window-demo";
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
import PointerDemo from "@/components/demos/pointer-demo";

const components = [
  
  {
    id: "window",
    name: "Window",
    section: "Primitives",
    description: "A draggable, resizable window inside a container.",
    demo: <WindowDemo />,
  },
  {
    id: "badge",
    name: "Badge",
    section: "Primitives",
    description: "A clean set of badge components with an edible look.",
    demo: <BadgeDemo />,
  },
  {
    id: "button",
    name: "Button",
    section: "Primitives",
    description: "A button component that *feels* good to use.",
    demo: <ButtonDemo />,
  },
  {
    id: "code-block",
    name: "Code Block",
    section: "Primitives",
    description: "A code block with syntax highlighting and quick copying.",
    demo: <CodeBlockDemo />,
  },
  {
    id: "markdown",
    name: "Markdown",
    section: "Primitives",
    description: "A markdown component with a clean look and no-frills parsing.",
    demo: <MarkdownDemo />,
  },
  {
    id: "select",
    name: "Select",
    section: "Primitives",
    description: "A lightly skinned select component.",
    demo: <SelectDemo />,
  },
  {
    id: "input",
    name: "Input",
    section: "Primitives",
    description: "A simple input component with a tactile feel.",
    demo: <InputDemo />,
  },
  {
    id: "textarea",
    name: "Textarea",
    section: "Primitives",
    description: "An input that can increase in height to accommodate more text.",
    demo: <TextareaDemo />,
  },
  {
    id: "card",
    name: "Card",
    section: "Primitives",
    description: "A variety of clean cards, from minimal to flashy.",
    demo: <CardDemo />,
  },
  {
    id: "description-list",
    name: "Description List",
    section: "Primitives",
    description: "Quickly display a json object in an aesthetically pleasing way.",
    demo: <DescriptionListDemo />,
  },
  {
    id: "page-header",
    name: "Page Header",
    section: "Primitives",
    description: "A clean page header so your pages look consistent.",
    demo: <PageHeaderDemo />,
  },
  
  {
    id: "chat-input",
    name: "Chat Input",
    section: "AI",
    description: "A chat input component for a nice chatbot experience. Ready for useChat().",
    demo: <ChatInputDemo />,
  },
  {
    id: "chat-message",
    name: "Chat Message",
    section: "AI",
    description:
      "A chat message component compatible with the Vercel AI SDK including markdown support, copying, etc.",
    demo: <ChatMessageDemo />,
  },
  {
    id: "jsx-preview",
    name: "JSX Preview",
    section: "AI",
    description:
      "A preview of a JSX component rendered from a string. Useful for LLM-generated UIs.",
    demo: <JSXPreviewDemo />,
  },
  {
    id: "pointer",
    name: "Pointer",
    section: "AI",
    description: "A controllable on-screen pointer that moves to coordinates and shows thoughts.",
    demo: <PointerDemo />,
  },
  
  {
    id: "reveal",
    name: "Reveal",
    section: "Effects",
    description: "A simple wrapper that reveals content when it scrolls into view.",
    demo: <RevealDemo />,
  },
  
  {
    id: "motion-blur-text",
    name: "Motion Blur Text",
    section: "Effects",
    description: "A cool motion blur text effect.",
    demo: <MotionBlurTextDemo />,
  },
  
];

// Order in which sections should appear in the sidebar
const sectionOrder = ["Primitives", "AI", "Effects"];

export default function Home() {
  // Group components by their section for easier rendering in the sidebar
  const componentsBySection = React.useMemo(() => {
    return components.reduce<Record<string, typeof components>>((acc, component) => {
      const { section } = component as { section: string };
      if (!acc[section]) acc[section] = [];
      acc[section].push(component);
      return acc;
    }, {} as Record<string, typeof components>);
  }, []);

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-screen px-4 pt-8 gap-8">
      <header className="flex flex-col gap-2 px-3">
        <h1 className="text-4xl mt-8 font-semibold tracking-tight">Asanshay&apos;s Components</h1>
        <p className="text-muted-foreground text-lg">
          A set of components I&apos;ve built. Designed to be flexible, LLM-friendly, and functional
          while still being beautiful. Just init with{" "}
          <a
            href="https://ui.shadcn.com/docs/installation"
            className="underline underline-offset-2 hover:text-foreground transition-all duration-200"
          >
            shadcn
          </a>{" "}
          and add the components you need.
        </p>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-4 gap-8 relative min-h-0 overflow-hidden">
        <div className="flex flex-col flex-1 col-span-1 items-start sticky top-0">
          {sectionOrder.map((section) => {
            const comps = componentsBySection[section];
            if (!comps) return null;
            return (
              <React.Fragment key={section}>
                <span className="text-muted-foreground text-xs uppercase tracking-widest font-medium mt-6 mb-1 ml-3 first:mt-0">
                  {section}
                </span>
                {comps.map((component) => (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    asChild
                    key={component.id}
                  >
                    <Link href={`#${component.id}`}>{component.name}</Link>
                  </Button>
                ))}
              </React.Fragment>
            );
          })}
        </div>
        <div className="flex flex-col flex-1 gap-8 col-span-3 overflow-y-auto scroll-smooth">
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
        </div>
      </main>
    </div>
  );
}
