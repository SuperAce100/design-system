"use client";

import * as React from "react";
import Link from "next/link";

import ComponentFrame from "@/components/component-frame";
import { ScriptCopyBtn } from "@/components/magicui/script-copy-btn";
import { ComponentMeta } from "@/lib/component-registry";
import { cn } from "@/lib/utils";
import type { ComponentSourceFile } from "@/types/component-source";

type ComponentSection = {
  title: ComponentMeta["section"];
  components: ComponentMeta[];
};

type ComponentDocsPageProps = {
  meta: ComponentMeta;
  demo: React.ReactNode;
  sections: ComponentSection[];
  sourceFiles?: ComponentSourceFile[];
};

const pageAnchors = [
  { id: "preview", label: "Preview" },
  { id: "installation", label: "Installation" },
];

export default function ComponentDocsPage({ meta, demo, sections, sourceFiles }: ComponentDocsPageProps) {
  return (
    <>
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 pb-24 pt-8 lg:pb-12">
        <header className="flex flex-col gap-3 px-1">
          <div className="text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              Components
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{meta.name}</span>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-4xl font-semibold tracking-tight">{meta.name}</h1>
              {meta.description ? (
                <p className="text-lg text-muted-foreground">{meta.description}</p>
              ) : null}
            </div>
          </div>
        </header>
        <main className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-[240px_minmax(0,1fr)_200px]">
          <nav className="sticky top-6 hidden max-h-[calc(100vh-3rem)] flex-col overflow-y-auto pr-2 lg:flex">
            <ComponentNavList sections={sections} activeId={meta.id} />
          </nav>
          <div className="flex min-w-0 flex-col gap-10">
            <section id="preview" className="px-1">
              <ComponentFrame
                key={meta.id}
                id={meta.id}
                className="rounded-none border-0 bg-transparent p-0 shadow-none"
                sourceFiles={sourceFiles}
              >
                {demo}
              </ComponentFrame>
            </section>
            <section id="installation" className="px-1">
              <h2 className="mb-2 text-xl font-medium">Installation</h2>
              <p className="mb-3 text-sm text-muted-foreground">Install using the shadcn CLI</p>
              <ScriptCopyBtn
                commandMap={{
                  npm: `npx shadcn@latest add https://ds.asanshay.com/r/${meta.id}.json`,
                  yarn: `yarn shadcn@latest add https://ds.asanshay.com/r/${meta.id}.json`,
                  pnpm: `pnpm dlx shadcn@latest add https://ds.asanshay.com/r/${meta.id}.json`,
                  bun: `bunx shadcn@latest add https://ds.asanshay.com/r/${meta.id}.json`,
                }}
              />
            </section>
          </div>
          <aside className="sticky top-6 hidden flex-col gap-2 lg:flex">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">On this page</span>
            {pageAnchors.map((anchor) => (
              <a
                key={anchor.id}
                href={`#${anchor.id}`}
                className="py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {anchor.label}
              </a>
            ))}
          </aside>
        </main>
        <aside className="px-1 lg:hidden">
          <div className="mt-6 border-t pt-6">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">On this page</span>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
              {pageAnchors.map((anchor) => (
                <a
                  key={anchor.id}
                  href={`#${anchor.id}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {anchor.label}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
      <MobileBottomNav sections={sections} activeId={meta.id} />
    </>
  );
}

function ComponentNavList({
  sections,
  activeId,
}: {
  sections: ComponentSection[];
  activeId: string;
}) {
  if (!sections.length) return null;

  return (
    <div className="flex flex-col">
      {sections.map((section) => (
        <React.Fragment key={section.title}>
          <span className="ml-3 mt-6 mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground first:mt-0">
            {section.title}
          </span>
          <div className="flex flex-col gap-1">
            {section.components.map((component) => (
              <Link
                key={component.id}
                href={`/${component.id}`}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-foreground",
                  component.id === activeId
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {component.name}
              </Link>
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

function MobileBottomNav({
  sections,
  activeId,
}: {
  sections: ComponentSection[];
  activeId: string;
}) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const activeItemRef = React.useRef<HTMLAnchorElement>(null);

  // Flatten all components for the bottom bar
  const allComponents = React.useMemo(
    () => sections.flatMap((section) => section.components),
    [sections]
  );

  // Scroll to active item on mount
  React.useEffect(() => {
    if (activeItemRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeItem = activeItemRef.current;
      const containerWidth = container.offsetWidth;
      const itemLeft = activeItem.offsetLeft;
      const itemWidth = activeItem.offsetWidth;

      // Center the active item in the container
      container.scrollTo({
        left: itemLeft - containerWidth / 2 + itemWidth / 2,
        behavior: "instant",
      });
    }
  }, [activeId]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:hidden">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide px-2 py-2 gap-1"
      >
        {allComponents.map((component) => {
          const isActive = component.id === activeId;
          return (
            <Link
              key={component.id}
              ref={isActive ? activeItemRef : undefined}
              href={`/${component.id}`}
              className={cn(
                "flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {component.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
