"use client";
import ShowcaseChat from "@/components/showcase-chat";

export default function ChatExample() {
  return (
    <section className="px-1">
      <div className="text-sm text-muted-foreground mb-2">AI Builder</div>
      <ShowcaseChat className="flex flex-col gap-2" defaultModel="gpt-5-nano" />
    </section>
  );
}
