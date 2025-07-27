"use client";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import Markdown from "@/registry/new-york/blocks/markdown/markdown";
import React from "react";
import { Button } from "@/registry/new-york/blocks/button/button";
import { Copy, Check } from "lucide-react";

export interface Message {
  role: "user" | "assistant";
  content: string;
  avatar?: string;
}

const userMessageVariants = cva("flex flex-col gap-2", {
  variants: {
    variant: {
      message:
        "bg-gradient-to-b from-primary to-primary/70 border border-primary text-primary-foreground shadow-lg shadow-slate-200/50 max-w-2xs ml-auto rounded-xl px-4 py-2 font-medium",
      title: "font-semibold tracking-tight text-3xl mt-4 border-b-2 border-primary/30 pb-2",
    },
  },
});
const assistantMessageVariants = cva("flex flex-col gap-2", {
  variants: {
    variant: {
      message:
        "bg-gradient-to-b from-muted to-muted/50 rounded-xl px-6 py-4 border shadow-lg shadow-slate-200/50 mr-8",
      paragraph: "",
    },
  },
});

export default function ChatMessage({
  message,
  className,
}: {
  message: Message;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (message.role === "user") {
    return (
      <div className={cn(userMessageVariants({ variant: "message" }), className)}>
        {message.content}
      </div>
    );
  }

  return (
    <div className={cn("flex items-start gap-3", className)}>
      <div className="shrink-0">
        {message.avatar && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={message.avatar}
            alt="Assistant avatar"
            className="size-8 rounded-full object-cover mt-1"
          />
        )}
      </div>

      <div
        className={cn(
          "flex flex-col gap-1 relative",
          assistantMessageVariants({ variant: "message" })
        )}
      >
        <Markdown>{message.content}</Markdown>
        <Button
          onClick={copyToClipboard}
          variant="ghost"
          size="iconSm"
          className="absolute right-1 bottom-1 focus-visible:ring-0 bg-transparent text-muted-foreground hover:bg-muted active:bg-muted"
          aria-label={copied ? "Copied" : "Copy to clipboard"}
        >
          <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
          <Copy
            className={cn("size-3 transition-all duration-300", copied ? "scale-0" : "scale-100")}
          />
          <Check
            className={cn(
              "absolute inset-0 m-auto size-3 transition-all duration-300 text-emerald-500",
              copied ? "scale-100" : "scale-0"
            )}
          />
        </Button>
      </div>
    </div>
  );
}
