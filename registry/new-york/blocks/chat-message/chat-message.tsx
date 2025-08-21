"use client";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import Markdown from "@/registry/new-york/blocks/markdown/markdown";
import React from "react";
import { Button } from "@/registry/new-york/blocks/button/button";
import { Copy, Check } from "lucide-react";
import { ToolUIPart, UIMessage } from "ai";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ChatReasoning from "../chat-reasoning/chat-reasoning";

const userMessageVariants = cva("flex flex-col gap-2", {
  variants: {
    variant: {
      message:
        "bg-gradient-to-b from-primary to-primary/70 border border-primary text-primary-foreground shadow-lg shadow-slate-200/50 dark:shadow-none max-w-2xs ml-auto rounded-xl px-4 py-2 font-medium",
      title: "font-semibold tracking-tight text-3xl mt-4 border-b-2 border-primary/30 pb-2",
    },
  },
});
const assistantMessageVariants = cva("flex flex-col gap-2", {
  variants: {
    variant: {
      message:
        "bg-gradient-to-b from-muted to-muted/50 rounded-xl px-4 py-2 border shadow-md shadow-foreground/5 dark:shadow-none mr-8",
      paragraph: "",
    },
  },
});

// Helper function to render a single message part
const renderMessagePart = (part: any, key: string | number) => {
  if (part.type.includes("tool")) {
    return <div key={key}>Tool</div>;
  } else if (part.type === "text") {
    return <Markdown key={key}>{part.text}</Markdown>;
  } else if (part.type === "reasoning") {
    return (
      <Markdown key={key} className="text-sm text-muted-foreground">
        {part.text}
      </Markdown>
    );
  }
  return null;
};

export default function ChatMessage({
  message,
  className,
}: {
  message: UIMessage;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("temp");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (message.role === "user") {
    return (
      <div className={cn(userMessageVariants({ variant: "message" }), className)}>
        {message.parts.map((part) => part.type === "text" && part.text).join("")}
      </div>
    );
  }

  // Find the first text part to determine accordion boundary
  const firstTextIndex = message.parts.findIndex((part) => part.type === "text");
  const hasTextPart = firstTextIndex !== -1;

  // Determine accordion state and content
  const shouldShowAccordion = firstTextIndex !== 0; // Show if first part is not text
  const accordionDefaultValue = !hasTextPart ? "reasoning" : undefined; // Open if no text parts
  const partsInAccordion = shouldShowAccordion ? message.parts.slice(0, firstTextIndex) : [];
  const partsAfter = hasTextPart ? message.parts.slice(firstTextIndex) : [];

  // If no accordion needed (first part is text), render normally
  if (!shouldShowAccordion) {
    return (
      <div className={cn("flex items-start gap-3", className)}>
        <div
          className={cn(
            "flex flex-col gap-1 relative",
            assistantMessageVariants({ variant: "message" })
          )}
        >
          {message.parts.map((part, index) => renderMessagePart(part, index))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-start gap-3", className)}>
      <div
        className={cn(
          "flex flex-col gap-1 relative",
          assistantMessageVariants({ variant: "message" })
        )}
      >
        <ChatReasoning
          renderMessagePart={renderMessagePart}
          partsInAccordion={partsInAccordion}
          defaultValue={accordionDefaultValue}
        />
        {partsAfter.map((part, index) => renderMessagePart(part, firstTextIndex + index))}
      </div>
    </div>
  );
}
