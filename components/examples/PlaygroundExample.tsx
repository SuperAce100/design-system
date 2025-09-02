"use client";
import { Card, CardDescription, CardHeader, CardTitle } from "@/registry/new-york/blocks/card/card";
import Markdown from "@/registry/new-york/blocks/markdown/markdown";
import { CodeBlock } from "@/registry/new-york/blocks/code-block/code-block";

export default function PlaygroundExample() {
  return (
    <section className="px-1 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Markdown without a card wrapper */}
      <div className="rounded-2xl border bg-card p-4">
        <div className="mb-3">
          <div className="text-lg font-medium">Markdown</div>
          <div className="text-sm text-muted-foreground">Rendered via the Markdown block.</div>
        </div>
        <Markdown>{`# Hello, world!\nThis is a **playground** area.\n\n- Buttons\n- Cards\n- Text inputs\n\n> Build your design system, your way.`}</Markdown>
      </div>

      {/* Code block standalone */}
      <CodeBlock
        variant="flat"
        language="tsx"
        title="install.ts"
        code={`import { Button } from "@/registry/new-york/blocks/button/button";\n\nexport function CTA(){\n  return <Button variant=\"fancy\">Install</Button>;\n}`}
      />
    </section>
  );
}
