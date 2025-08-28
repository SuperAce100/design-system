import * as React from "react";
import ComponentFrame from "@/components/component-frame";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllComponentIds,
  getComponentMeta,
  getDemoById,
  sectionOrder,
  componentList,
} from "@/lib/component-registry";
import { Button } from "@/registry/new-york/blocks/button/button";
import { ScriptCopyBtn } from "@/components/magicui/script-copy-btn";

export async function generateStaticParams() {
  return getAllComponentIds().map((id) => ({ component: id }));
}

export default function ComponentPage({ params }: { params: { component: string } }) {
  const id = params.component;
  const meta = getComponentMeta(id);
  const demo = getDemoById(id);

  if (!meta || !demo) {
    notFound();
  }

  const componentsBySection = React.useMemo(() => {
    return componentList.reduce<Record<string, typeof componentList>>((acc, component) => {
      const section = component.section;
      if (!acc[section]) acc[section] = [] as unknown as typeof componentList;
      acc[section].push(component);
      return acc;
    }, {} as Record<string, typeof componentList>);
  }, []);

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-screen px-4 pt-8 gap-8">
      <header className="flex flex-col gap-2 px-3">
        <div className="text-sm text-muted-foreground mt-6">
          <Link href="/" className="hover:text-foreground transition-colors">
            Components
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{meta.name}</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-semibold tracking-tight">{meta.name}</h1>
            {meta.description && (
              <p className="text-muted-foreground text-lg">{meta.description}</p>
            )}
          </div>
          <Button variant="link" asChild className="p-0 mt-2">
            <Link href="/">All components</Link>
          </Button>
        </div>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-5 gap-8 relative min-h-0 overflow-hidden">
        <div className="flex flex-col flex-1 col-span-1 items-start sticky top-0">
          {sectionOrder.map((section) => {
            const comps = (componentsBySection as Record<string, typeof componentList>)[section];
            if (!comps) return null;
            return (
              <React.Fragment key={section}>
                <span className="text-muted-foreground text-xs uppercase tracking-widest font-medium mt-6 mb-1 ml-3 first:mt-0">
                  {section}
                </span>
                {comps.map((component) => (
                  <Button
                    variant={component.id === id ? "secondary" : "ghost"}
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
        <div className="flex flex-col flex-1 gap-10 col-span-3 overflow-y-auto scroll-smooth">
          <section id="preview" className="px-1">
            <h2 className="text-xl font-medium tracking-tight mb-2">Preview</h2>
            <ComponentFrame
              key={meta.id}
              title="Live preview"
              id={meta.id}
              componentName={meta.id}
              className="border-0 shadow-none rounded-none p-0 bg-transparent"
            >
              {demo}
            </ComponentFrame>
          </section>
          <section id="installation" className="px-1">
            <h2 className="text-xl font-medium tracking-tight mb-2">Installation</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Install with your preferred package manager:
            </p>
            <ScriptCopyBtn
              commandMap={{
                npm: `npx shadcn@latest add https://ds.asanshay.com/r/${meta.id}.json`,
                yarn: `yarn shadcn@latest add https://ds.asanshay.com/r/${meta.id}.json`,
                pnpm: `pnpm dlx shadcn@latest add https://ds.asanshay.com/r/${meta.id}.json`,
                bun: `bunx shadcn@latest add https://ds.asanshay.com/r/${meta.id}.json`,
              }}
            />
          </section>
          {/* Future: Usage, API, Examples */}
        </div>
        <aside className="hidden sm:flex flex-col col-span-1 sticky top-0 pt-10">
          <span className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
            On this page
          </span>
          <a href="#preview" className="text-sm text-muted-foreground hover:text-foreground py-1">
            Preview
          </a>
          <a
            href="#installation"
            className="text-sm text-muted-foreground hover:text-foreground py-1"
          >
            Installation
          </a>
        </aside>
      </main>
    </div>
  );
}
