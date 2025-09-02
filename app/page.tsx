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
    <div className="max-w-6xl mx-auto flex flex-col px-4 pt-8 gap-10">
      {/* Hero */}
      <header className="flex flex-col gap-6 items-center text-center mt-48">
        <Badge variant="fancy" color="primary" className="px-3 py-1">
          Now available: shadcn CLI 3.0 and MCP Server →
        </Badge>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
          The Foundation for your Design System
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl">
          A set of beautifully designed components that you can customize, extend, and build on.
          Start here then make it your own. Open Source. Open Code.
        </p>
        <div className="flex items-center gap-3">
          <Button size="lg">Get Started</Button>
          <Button variant="outline" size="lg">
            View Components
          </Button>
        </div>
      </header>

      {/* Examples */}
      <main className="flex flex-col gap-8 relative">
        {/* Tabs */}
        <div className="flex items-center gap-6 overflow-x-auto px-1">
          {[
            { id: "overview", label: "Examples" },
            { id: "dashboard", label: "Dashboard" },
            { id: "tasks", label: "Tasks" },
            { id: "playground", label: "Playground" },
            { id: "chat", label: "Chat" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Panels */}
        {activeTab === "overview" && <OverviewExample />}

        {activeTab === "dashboard" && <DashboardExample />}

        {activeTab === "tasks" && <TasksExample />}

        {activeTab === "playground" && <PlaygroundExample />}

        {activeTab === "chat" && <ChatExample />}

        {/* (Old showcase removed) */}

        {/* Components index */}
        {sectionOrder.map((section) => {
          const comps = componentsBySection[section];
          if (!comps) return null;
          const anchor = section.toLowerCase();
          return (
            <section key={section} id={anchor} className="px-1">
              <h2 className="text-xl font-medium mb-1">{section}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                {comps.map((component) => (
                  <Button
                    key={component.id}
                    variant="link"
                    size="sm"
                    className="justify-start no-underline text-primary pl-0 hover:opacity-100"
                    asChild
                  >
                    <Link href={`/${component.id}`}>{component.name}</Link>
                  </Button>
                ))}
              </div>
            </section>
          );
        })}
        <div className="pb-10" />
      </main>
    </div>
  );
}
