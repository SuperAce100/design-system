"use client";
import Link from "next/link";
import { Button } from "@/registry/new-york/blocks/button/button";
import { Badge } from "@/registry/new-york/blocks/badge/badge";
import Reveal from "@/registry/new-york/blocks/reveal/reveal";
import { Github } from "lucide-react";
import ChatInput from "@/registry/new-york/blocks/chat-input/chat-input";

export default function Home() {
  return (
    <div className="flex flex-col px-4 gap-10 bg-radial-[at_40%_30%] from-primary/0 to-primary/30 dark:from-primary/40 dark:to-primary/0">
      {/* Hero */}
      <header className="max-w-2xl mx-auto flex flex-col gap-6 items-center text-center h-screen justify-center">
        <Reveal index={0}>
          <Badge variant="fancy" color="primary" className="px-3 py-1">
            <span className="dark:text-foreground text-muted-foreground uppercase text-xs font-bold mr-1 -ml-1">
              New
            </span>{" "}
            Full chat with backend route!
          </Badge>
        </Reveal>
        <Reveal index={1}>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-balance">
            Add AI to your app in one command
          </h1>
        </Reveal>
        <Reveal index={1} className="w-full">
          <ChatInput
            placeholder="Type something..."
            models={[
              {
                id: "gpt-5-mini",
                name: "GPT-5 mini",
                description: "Fast and affordable",
              },
            ]}
            loading={false}
            handleSubmit={() => {}}
            handleInputChange={() => {}}
            input=""
            model="gpt-5-mini"
            className="w-full"
          />
        </Reveal>
        <Reveal index={2}>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Take your apps to the next level with a set of handcrafted, shadcn compatible components
            that you can customize and extend. All logic built in - reasoning, tool calling, chat
            messages, computer use, and more. Just add an OpenAI key.
          </p>
        </Reveal>
        <Reveal index={3}>
          <div className="flex items-center gap-3">
            <Button
              variant="default"
              size="lg"
              className="inset-shadow-card inset-shadow-sm bg-radial-[at_50%_25%] dark:to-card dark:from-transparent to-transparent from-card hover:-translate-y-px active:translate-y-px border-card shadow-foreground/5 text-primary hover:from-primary/20"
            >
              <Github className="size-4" />
              GitHub
            </Button>
            <Button variant="fancy" size="lg" asChild>
              <Link href="/components">Get Started</Link>
            </Button>
          </div>
        </Reveal>
      </header>
    </div>
  );
}
