import { sectionOrder, componentList } from "@/lib/component-registry";
import Link from "next/link";
import { Button } from "@/registry/new-york/blocks/button/button";

export default function ComponentsPage() {
  const componentsBySection = componentList.reduce<Record<string, typeof componentList>>(
    (acc, component) => {
      const section = component.section;
      if (!acc[section]) acc[section] = [] as unknown as typeof componentList;
      acc[section].push(component);
      return acc;
    },
    {} as Record<string, typeof componentList>
  );

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-screen px-4 pt-8 gap-8">
      <header className="flex flex-col gap-2 px-3">
        <div className="text-sm text-muted-foreground mt-6">
          <Link href="/components" className="hover:text-foreground transition-colors">
            Components
          </Link>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-semibold tracking-tight">Components</h1>
            <p className="text-muted-foreground text-lg">
              A set of beautifully designed components that you can customize, extend, and build on.
              Start here then make it your own. Open Source. Open Code.
            </p>
          </div>
        </div>
      </header>
      <main className="flex flex-col gap-8 px-2">
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
      </main>
    </div>
  );
}
