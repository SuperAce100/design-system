import * as React from "react";
import Link from "next/link";
import ModeToggle from "@/components/ui/mode-toggle";
import { Button } from "@/registry/new-york/blocks/button/button";
import { componentList, sectionOrder } from "@/lib/component-registry";

const components = componentList;

export default function Home() {
  // Group components by their section for easier rendering in the sidebar
  const componentsBySection = React.useMemo(() => {
    return components.reduce<Record<string, typeof components>>((acc, component) => {
      const section = component.section as string;
      if (!acc[section]) acc[section] = [] as unknown as typeof components;
      acc[section].push(component);
      return acc;
    }, {} as Record<string, typeof components>);
  }, []);

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-screen px-4 pt-8 gap-8">
      <header className="flex flex-col gap-2 px-3">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl mt-8 font-semibold tracking-tight">Asanshay&apos;s Components</h1>
          <ModeToggle />
        </div>
        <p className="text-muted-foreground text-lg">
          A set of components I&apos;ve built. Designed to be flexible, LLM-friendly, and functional
          while still being beautiful. Just init with{" "}
          <Button variant="link" asChild className="p-0">
            <Link href="https://ui.shadcn.com/docs/installation">shadcn</Link>
          </Button>{" "}
          and add the components you need.
        </p>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-4 gap-8 relative min-h-0 overflow-hidden">
        <div className="flex flex-col flex-1 col-span-1 items-start sticky top-0">
          {sectionOrder.map((section) => {
            const comps = componentsBySection[section];
            if (!comps) return null;
            return (
              <React.Fragment key={section}>
                <span className="text-muted-foreground text-xs uppercase tracking-widest font-medium mt-6 mb-1 ml-3 first:mt-0">
                  {section}
                </span>
                {comps.map((component) => (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    asChild
                    key={component.id}
                  >
                    <Link href={`/${component.id}`}>{component.name}</Link>
                  </Button>
                ))}
              </React.Fragment>
            );
          })}
        </div>
        <div className="flex flex-col flex-1 gap-8 col-span-3 overflow-y-auto scroll-smooth" />
      </main>
    </div>
  );
}
