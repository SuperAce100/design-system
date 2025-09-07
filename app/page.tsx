"use client";
import Link from "next/link";
import { Button } from "@/registry/new-york/blocks/button/button";
import { Badge } from "@/registry/new-york/blocks/badge/badge";
import Reveal from "@/registry/new-york/blocks/reveal/reveal";

export default function Home() {
  return (
    <div className="flex flex-col px-4 gap-10 bg-radial-[at_40%_30%] from-primary/0 to-primary/30 dark:from-primary/40 dark:to-primary/0">
      {/* Hero */}
      <header className="max-w-2xl mx-auto flex flex-col gap-6 items-center text-center h-screen justify-center">
        <Reveal index={0}>
          <Badge variant="fancy" color="primary" className="px-3 py-1">
            New: reasoning and tool calling in chat!
          </Badge>
        </Reveal>
        <Reveal index={1}>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-balance">
            The most beautiful components for AI and UI
          </h1>
        </Reveal>
        <Reveal index={2}>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Take your apps to the next level with a set of handcrafted, shadcn compatible components
            that you can customize and extend. All logic built in - reasoning, tool calling, chat
            messages, computer use, and more.
          </p>
        </Reveal>
        <Reveal index={3}>
          <div className="flex items-center gap-3">
            <Button variant="fancy" size="lg" asChild>
              <Link href="/components">Get Started</Link>
            </Button>
          </div>
        </Reveal>
      </header>
    </div>
  );
}
