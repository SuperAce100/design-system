"use client";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import Markdown from "@/registry/new-york/blocks/markdown/markdown";
import React from "react";
import { Button } from "@/registry/new-york/blocks/button/button";
import { Copy, Check } from "lucide-react";
import { ToolUIPart, UIMessage } from "ai";

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

  return (
    <div className={cn("flex items-start gap-3", className)}>
      <div
        className={cn(
          "flex flex-col gap-1 relative",
          assistantMessageVariants({ variant: "message" })
        )}
      >
        {message.parts.map((part) => {
          if (part.type.includes("tool")) {
            return "Tool";
          } else if (part.type === "text") {
            return <Markdown>{part.text}</Markdown>;
          } else if (part.type === "reasoning") {
            return <Markdown className="text-sm text-muted-foreground">{part.text}</Markdown>;
          }
          return null;
        })}
      </div>
    </div>
  );
}
