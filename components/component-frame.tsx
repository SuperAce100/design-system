"use client";
import { cn } from "@/lib/utils";
import { ScriptCopyBtn } from "@/components/magicui/script-copy-btn";
import { CodeBlock } from "@/registry/new-york/blocks/code-block/code-block";
import React from "react";

const BASE_URL = "https://ds.asanshay.com/r/";

export default function ComponentFrame({
  children,
  className,
  title,
  description,
  id,
  componentName,
  source,
  sourcePath,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  id?: string;
  componentName: string;
  className?: string;
  source?: string;
  sourcePath?: string;
}) {
  const [activeTab, setActiveTab] = React.useState<"demo" | "source">("demo");
  const [code, setCode] = React.useState<string | null>(source || null);

  React.useEffect(() => {
    if (code || activeTab !== "source") return; // only fetch when needed
    const path = sourcePath ?? `components/demos/${componentName}-demo.tsx`;
    fetch(`/api/source?path=${encodeURIComponent(path)}`)
      .then((res) => (res.ok ? res.text() : null))
      .then((text) => {
        if (text) setCode(text);
      })
      .catch(() => {});
  }, [code, componentName, sourcePath, activeTab]);
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border dark:border-none rounded-3xl p-6 relative bg-card shadow-xl dark:shadow-none shadow-gray-300/20",
        className
      )}
      id={id}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab("demo")}
            aria-selected={activeTab === "demo"}
            className={cn(
              "text-xl font-medium rounded-md transition-colors",
              activeTab === "demo"
                ? "text-foreground"
                : "text-muted-foreground/50 hover:text-foreground/80"
            )}
          >
            Preview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("source")}
            aria-selected={activeTab === "source"}
            className={cn(
              "text-xl font-medium rounded-md transition-colors",
              activeTab === "source"
                ? "text-foreground"
                : "text-muted-foreground/50 hover:text-foreground/80"
            )}
          >
            Code
          </button>
        </div>
      </div>
      {activeTab === "demo" ? (
        <div className="flex items-center justify-center min-h-[360px] relative">{children}</div>
      ) : (
        <div className="relative max-h-[360px] overflow-y-auto rounded-xl">
          {code && <CodeBlock code={code} language="tsx" className="mt-0" variant="flat" />}
        </div>
      )}
    </div>
  );
}
