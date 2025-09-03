"use client";
import * as React from "react";
import Link from "next/link";
import ModeToggle from "@/components/ui/mode-toggle";
import { Button } from "@/registry/new-york/blocks/button/button";
import { componentList, sectionOrder } from "@/lib/component-registry";
import { Card, CardDescription, CardHeader, CardTitle } from "@/registry/new-york/blocks/card/card";
import { CodeBlock } from "@/registry/new-york/blocks/code-block/code-block";
import { Badge } from "@/registry/new-york/blocks/badge/badge";
import type { UIMessage } from "ai";
import MotionBlurText from "@/registry/new-york/blocks/motion-blur-text/motion-blur-text";
import Reveal from "@/registry/new-york/blocks/reveal/reveal";
import ShowcaseChat from "@/components/showcase-chat";
import { Input } from "@/registry/new-york/blocks/input/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/blocks/select/select";
import { Textarea } from "@/registry/new-york/blocks/textarea/textarea";
import Markdown from "@/registry/new-york/blocks/markdown/markdown";
import { DescriptionList } from "@/registry/new-york/blocks/description-list/description-list";
import OverviewExample from "@/components/examples/OverviewExample";
import DashboardExample from "@/components/examples/DashboardExample";
import TasksExample from "@/components/examples/TasksExample";
import PlaygroundExample from "@/components/examples/PlaygroundExample";
import ChatExample from "@/components/examples/ChatExample";

const components = componentList;

export default function Home() {
  // Group components by their section for easier rendering
  const componentsBySection = React.useMemo(() => {
    return components.reduce<Record<string, typeof components>>((acc, component) => {
      const section = component.section as string;
      if (!acc[section]) acc[section] = [] as unknown as typeof components;
      acc[section].push(component);
      return acc;
    }, {} as Record<string, typeof components>);
  }, []);

  // Tabs state
  const [activeTab, setActiveTab] = React.useState<string>("overview");

  return (
    <div className="flex flex-col px-4 gap-10">
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
