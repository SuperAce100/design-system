"use client";
import { cn } from "@/lib/utils";
import { ScriptCopyBtn } from "@/components/magicui/script-copy-btn";
import { Button } from "@/registry/new-york/blocks/button/button";
import { CodeBlock } from "@/registry/new-york/blocks/code-block/code-block";
import { Code2Icon } from "lucide-react";
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
  const [showSource, setShowSource] = React.useState(false);
  const [code, setCode] = React.useState<string | null>(source || null);

  React.useEffect(() => {
    if (code) return; // already have source
    const path = sourcePath ?? `components/demos/${componentName}-demo.tsx`;
    fetch(`/api/source?path=${encodeURIComponent(path)}`)
      .then((res) => (res.ok ? res.text() : null))
      .then((text) => {
        if (text) setCode(text);
      })
      .catch(() => {});
  }, [code, componentName, sourcePath]);
  return (
    <div
      className={cn(
        "flex flex-col gap-4  rounded-3xl p-6 relative bg-card shadow-xl dark:shadow-none shadow-gray-300/20",
        className
      )}
      id={id}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold">{title}</h2>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        <div className="flex gap-0 items-center">
          <ScriptCopyBtn
            className=""
            commandMap={{
              npm: `npx shadcn@latest add ${BASE_URL}${componentName}.json`,
              yarn: `yarn shadcn@latest add ${BASE_URL}${componentName}.json`,
              pnpm: `pnpm dlx shadcn@latest add ${BASE_URL}${componentName}.json`,
              bun: `bunx shadcn@latest add ${BASE_URL}${componentName}.json`,
            }}
          />
          {code && (
            <Button
              variant="ghost"
              size="icon"
              className=" text-foreground hover:text-primary rounded-md size-9"
              onClick={() => setShowSource((prev) => !prev)}
              aria-label={showSource ? "Hide source" : "Show source"}
            >
              <Code2Icon className="size-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[400px] relative">{children}</div>
      {showSource && code && (
        <CodeBlock code={code} language="tsx" className="mt-4" variant="flat" />
      )}
    </div>
  );
}
