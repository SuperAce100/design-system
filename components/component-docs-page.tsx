"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import ComponentFrame from "@/components/component-frame";
import { ScriptCopyBtn } from "@/components/magicui/script-copy-btn";
import { ComponentMeta } from "@/lib/component-registry";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/new-york/blocks/button/button";

type ComponentSection = {
  title: ComponentMeta["section"];
  components: ComponentMeta[];
};

type ComponentDocsPageProps = {
  meta: ComponentMeta;
  demo: React.ReactNode;
  sections: ComponentSection[];
};

const pageAnchors = [
  { id: "preview", label: "Preview" },
  { id: "installation", label: "Installation" },
];

export default function ComponentDocsPage({ meta, demo, sections }: ComponentDocsPageProps) {
  const [navOpen, setNavOpen] = React.useState(false);

  React.useEffect(() => {
    if (!navOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setNavOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [navOpen]);

  return (
    <>
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 pb-12 pt-8">
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
            <div className="flex items-center gap-3 sm:gap-4">
              <Button
                variant="outline"
                size="sm"
                className="sm:hidden"
                onClick={() => setNavOpen(true)}
                aria-label="Open component menu"
              >
                <Menu className="mr-2 h-4 w-4" />
                Browse components
              </Button>
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
                componentName={meta.id}
                className="rounded-none border-0 bg-transparent p-0 shadow-none"
              >
                {demo}
              </ComponentFrame>
            </section>
            <section id="installation" className="px-1">
              <h2 className="mb-2 text-xl font-medium">Installation</h2>
              <p className="mb-3 text-sm text-muted-foreground">Install using the shadcn CLI</p>
              <ScriptCopyBtn
                commandMap={{
                  npm: `npx shadcn@latest add https://splashui.com/r/${meta.id}.json`,
                  yarn: `yarn shadcn@latest add https://splashui.com/r/${meta.id}.json`,
                  pnpm: `pnpm dlx shadcn@latest add https://splashui.com/r/${meta.id}.json`,
                  bun: `bunx shadcn@latest add https://splashui.com/r/${meta.id}.json`,
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
      <MobileNav open={navOpen} onClose={() => setNavOpen(false)}>
        <ComponentNavList sections={sections} activeId={meta.id} onNavigate={() => setNavOpen(false)} />
      </MobileNav>
    </>
  );
}

function ComponentNavList({
  sections,
  activeId,
  onNavigate,
}: {
  sections: ComponentSection[];
  activeId: string;
  onNavigate?: () => void;
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
              <Button
                key={component.id}
                variant="ghost"
                size="sm"
                className={cn(
                  "w-full justify-start text-left",
                  component.id === activeId && "bg-primary/10 text-foreground"
                )}
                asChild
              >
                <Link href={`/${component.id}`} onClick={onNavigate}>
                  {component.name}
                </Link>
              </Button>
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

function MobileNav({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto flex h-full w-[320px] max-w-full flex-col border-l bg-background px-5 py-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">Browse components</p>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto pr-1">{children}</div>
      </div>
    </div>
  );
}
