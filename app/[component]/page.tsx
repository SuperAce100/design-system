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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/registry/new-york/ui/card";

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
    <div className="max-w-5xl mx-auto flex flex-col h-screen px-4 pt-8 gap-8">
      <main className="grid grid-cols-1 sm:grid-cols-4 gap-8 relative min-h-0 overflow-hidden">
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
        <div className="flex flex-col flex-1 gap-6 col-span-3 overflow-y-auto scroll-smooth">
          <Card className="w-full">
            <CardHeader className="border-b">
              <CardTitle>{meta.name}</CardTitle>
              {meta.description && (
                <CardDescription>{meta.description}</CardDescription>
              )}
              <CardAction>
                <Button variant="link" asChild className="p-0">
                  <Link href="/">All components</Link>
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="py-6">
              <ComponentFrame
                key={meta.id}
                title="Live preview"
                id={meta.id}
                componentName={meta.id}
                className="border-0 shadow-none rounded-none p-0 bg-transparent"
              >
                {demo}
              </ComponentFrame>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
