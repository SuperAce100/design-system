"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { HTMLAttributes, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

interface ScriptCopyBtnProps extends HTMLAttributes<HTMLDivElement> {
  commandMap: Record<string, string>;
  className?: string;
}

export function ScriptCopyBtn({ commandMap, className }: ScriptCopyBtnProps) {
  const preferredOrder = ["pnpm", "npm", "yarn", "bun"];
  const provided = Object.keys(commandMap);
  const orderedPms = [
    ...preferredOrder.filter((pm) => provided.includes(pm)),
    ...provided.filter((pm) => !preferredOrder.includes(pm)),
  ];
  const [copied, setCopied] = useState(false);
  const [activePm, setActivePm] = useState<string>(orderedPms[0] ?? "npm");
  const activeCommand = useMemo(() => commandMap[activePm] ?? "", [commandMap, activePm]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderHighlightedCmd = (cmd: string) => {
    const tokens = cmd.trim().split(/\s+/g);
    const accentSet = new Set(["pnpm", "npm", "yarn", "bun", "npx", "bunx", "dlx"]);
    return (
      <>
        {tokens.map((tok, i) => {
          const isAccent = accentSet.has(tok);
          const isKeyword = tok === "add";
          const isTool = tok.includes("shadcn@latest");
          const className = cn(
            "",
            isAccent && "text-primary font-medium",
            isKeyword && "text-foreground font-medium",
            isTool && "text-foreground"
          );
          return (
            <span key={`${tok}-${i}`} className={className}>
              {i > 0 ? " " : null}
              {tok}
            </span>
          );
        })}
      </>
    );
  };

  // Measure active tab for underline positioning (lightweight, resize-observer based)
  const measure = () => {
    const container = containerRef.current;
    const btn = tabRefs.current[activePm];
    if (!container || !btn) return;
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setIndicator({ left: btnRect.left - containerRect.left, width: btnRect.width });
  };

  useLayoutEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePm, orderedPms.join(",")]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      // Throttle with rAF
      requestAnimationFrame(measure);
    });
    ro.observe(container);
    return () => {
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("w-full relative rounded-xl bg-muted", className)}>
      <div className="flex items-center justify-between pl-3 pr-1 pt-1">
        <div ref={containerRef} className="relative flex items-center gap-4 text-sm min-w-0">
          {orderedPms.map((pm) => {
            const isActive = pm === activePm;
            return (
              <button
                key={pm}
                type="button"
                onClick={() => setActivePm(pm)}
                className={cn(
                  "relative pb-2 pt-1 text-muted-foreground hover:text-primary transition-colors",
                  isActive && "text-primary"
                )}
                aria-current={isActive ? "true" : undefined}
                ref={(el) => {
                  tabRefs.current[pm] = el;
                }}
              >
                {pm}
              </button>
            );
          })}
          <span
            className="pointer-events-none absolute -bottom-px h-0.5 rounded bg-primary transition-all duration-300 ease-out"
            style={{ left: indicator.left + 0.05 * indicator.width, width: indicator.width * 0.9 }}
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="relative focus-visible:ring-0 text-muted-foreground hover:bg-muted-foreground/10 rounded-lg"
          aria-label={copied ? "Copied" : "Copy to clipboard"}
          onClick={() => copyToClipboard(activeCommand)}
        >
          <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
          <Copy
            className={`size-4 transition-all duration-300 ${copied ? "scale-0" : "scale-100"}`}
          />
          <Check
            className={`absolute inset-0 m-auto size-4 transition-all duration-300 text-success ${
              copied ? "scale-100" : "scale-0"
            }`}
          />
        </Button>
      </div>
      <div className="border-t px-3 py-2">
        <pre className="overflow-x-auto whitespace-pre-wrap break-words text-sm">
          <code className="font-mono leading-relaxed">{renderHighlightedCmd(activeCommand)}</code>
        </pre>
      </div>
    </div>
  );
}
