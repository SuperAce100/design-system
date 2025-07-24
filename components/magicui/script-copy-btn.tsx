"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { HTMLAttributes, useState } from "react";

interface ScriptCopyBtnProps extends HTMLAttributes<HTMLDivElement> {
  commandMap: Record<string, string>;
  className?: string;
}

export function ScriptCopyBtn({ commandMap, className }: ScriptCopyBtnProps) {
  const packageManagers = Object.keys(commandMap);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("ml-auto flex items-center", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative focus-visible:ring-0"
            aria-label={copied ? "Copied" : "Copy to clipboard"}
          >
            <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
            <Copy
              className={`size-4 transition-all duration-300 ${copied ? "scale-0" : "scale-100"}`}
            />
            <Check
              className={`absolute inset-0 m-auto size-4 transition-all duration-300 text-emerald-500 ${
                copied ? "scale-100" : "scale-0"
              }`}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {packageManagers.map((pm) => (
            <DropdownMenuItem
              key={pm}
              onSelect={() => {
                copyToClipboard(commandMap[pm]);
              }}
            >
              {pm}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
