"use client";
import * as React from "react";
import Link from "next/link";
import ModeToggle from "@/components/ui/mode-toggle";
import { Button } from "@/registry/new-york/blocks/button/button";
import { componentList, sectionOrder } from "@/lib/component-registry";
import { Card, CardDescription, CardHeader, CardTitle } from "@/registry/new-york/blocks/card/card";
import { CodeBlock } from "@/registry/new-york/blocks/code-block/code-block";
import ChatMessage from "@/registry/new-york/blocks/chat-message/chat-message";
import { Badge } from "@/registry/new-york/blocks/badge/badge";
import type { UIMessage } from "ai";
import MotionBlurText from "@/registry/new-york/blocks/motion-blur-text/motion-blur-text";
import Reveal from "@/registry/new-york/blocks/reveal/reveal";
import ChatInput from "@/registry/new-york/blocks/chat-input/chat-input";
import ShowcaseChat from "@/components/showcase-chat";

const components = componentList;

export default function Home() {
  // Group components by their section for easier rendering in the sidebar/content
  const componentsBySection = React.useMemo(() => {
    return components.reduce<Record<string, typeof components>>((acc, component) => {
      const section = component.section as string;
      if (!acc[section]) acc[section] = [] as unknown as typeof components;
      acc[section].push(component);
      return acc;
    }, {} as Record<string, typeof components>);
  }, []);

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-screen px-4 pt-8 gap-8 overflow-y-auto">
      <header className="flex flex-col gap-2 px-3">
        <div className="text-sm text-muted-foreground mt-6">
          <Link href="/" className="hover:text-foreground transition-colors">
            Components
          </Link>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-semibold tracking-tight">Asanshay's Components</h1>
            <p className="text-muted-foreground text-lg">
              A set of beautiful, flexible, and LLM-ready components for your next project.
            </p>
          </div>
        </div>
      </header>
      <main className="flex flex-col gap-8 relative min-h-0 overflow-hidden px-3 max-w-4xl">
        <section id="showcase" className="">
          <Card className="p-4">
            <Reveal index={0} className="flex items-center gap-2 mb-2">
              <Badge variant="regular" color="primary">
                New
              </Badge>
              <Badge variant="regular" color="emerald">
                LLM-ready
              </Badge>
              <Badge variant="regular" color="sky">
                Composable
              </Badge>
            </Reveal>
            <CardHeader className="p-0 mb-3">
              <MotionBlurText className="text-2xl font-medium tracking-tight">
                Showcase
              </MotionBlurText>
              <CardDescription>Multiple components working together.</CardDescription>
            </CardHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Reveal index={1} className="flex flex-col gap-2">
                <div className="rounded-xl border p-4">
                  <div className="text-sm text-muted-foreground mb-2">Preview</div>
                  <div className="flex flex-col gap-2">
                    <div className="rounded-2xl border p-4 bg-card">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">Design System Card</div>
                        <Badge variant="regular" color="indigo">
                          Beta
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Clean building blocks styled with shadcn.
                      </div>
                      <div className="mt-3">
                        <Button size="sm">Get Started</Button>
                      </div>
                    </div>
                  </div>
                </div>
                <CodeBlock
                  variant="flat"
                  title="Usage"
                  language="tsx"
                  code={`import { Card, CardHeader, CardTitle, CardDescription } from "@/registry/new-york/blocks/card/card";
import { Button } from "@/registry/new-york/blocks/button/button";
import { Badge } from "@/registry/new-york/blocks/badge/badge";

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Design System Card</CardTitle>
        <CardDescription>Clean building blocks styled with shadcn.</CardDescription>
      </CardHeader>
      <Badge variant="regular" color="indigo">Beta</Badge>
      <Button size="sm">Get Started</Button>
    </Card>
  );
}`}
                />
              </Reveal>
              <Reveal index={2} className="flex flex-col gap-2">
                <ShowcaseChat className="flex flex-col gap-2" defaultModel="gpt-5-nano" />
              </Reveal>
            </div>
          </Card>
        </section>
        {sectionOrder.map((section) => {
          const comps = componentsBySection[section];
          if (!comps) return null;
          const anchor = section.toLowerCase();
          return (
            <section key={section} id={anchor} className="">
              <h2 className="text-xl font-medium mb-1">{section}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                {comps.map((component) => (
                  <Button
                    key={component.id}
                    variant="link"
                    size="sm"
                    className="justify-start no-underline text-primary pl-0 hover:opacity-100 "
                    asChild
                  >
                    <Link href={`/${component.id}`}>{component.name}</Link>
                  </Button>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
