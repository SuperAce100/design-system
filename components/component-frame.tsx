"use client";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/registry/new-york/blocks/code-block/code-block";
import React from "react";

export default function ComponentFrame({
  children,
  className,
  id,
  source,
  title,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  source?: string;
  title?: string;
}) {
  const [activeTab, setActiveTab] = React.useState<"demo" | "source">("demo");

  const renderSource = () => {
    if (!source) {
      return <div className="text-sm text-muted-foreground">Source unavailable for this demo.</div>;
    }

    return <CodeBlock code={source} language="tsx" className="mt-0" variant="flat" />;
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-4 border dark:border-none rounded-3xl p-6 relative bg-card shadow-xl shadow-shade",
        className
      )}
      id={id}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab("demo")}
            className={cn(
              "text-xl font-medium rounded-md transition-colors",
              title ? "text-base" : "text-xl",
              activeTab === "demo"
                ? "text-foreground"
                : "text-muted-foreground/50 hover:text-foreground/80"
            )}
          >
            {title ?? "Preview"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("source")}
            className={cn(
              "font-medium rounded-md transition-colors",
              title ? "text-base" : "text-xl",
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
        <div className="flex flex-col items-center justify-center min-h-[200px] relative h-full">
          {children}
        </div>
      ) : (
        <div className="relative max-h-[360px] overflow-y-auto rounded-xl">{renderSource()}</div>
      )}
    </div>
  );
}
