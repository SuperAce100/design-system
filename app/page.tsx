import * as React from "react";
import Link from "next/link";
import ModeToggle from "@/components/ui/mode-toggle";
import { Button } from "@/registry/new-york/blocks/button/button";
import { componentList, sectionOrder } from "@/lib/component-registry";

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
    <div className="max-w-6xl mx-auto flex flex-col h-screen px-4 pt-8 gap-8">
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
