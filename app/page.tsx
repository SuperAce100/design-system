import { sectionOrder, componentList } from "@/lib/component-registry";
import { Button } from "@/registry/new-york/blocks/button/button";
import Link from "next/link";

export default function Home() {
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
        <Link href="/" className="text-sm text-muted-foreground mt-6">
          <span className="text-foreground">Components</span>
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-semibold tracking-tight">Asanshay&apos;s components</h1>
            <p className="text-muted-foreground text-lg">
              A component library designed to be beautiful, easy to use, and LLM-ready.
            </p>
          </div>
        </div>
      </header>
      <main className="flex flex-col gap-8 px-2 pb-16">
        {/* Components index */}
        {sectionOrder.map((section) => {
          const comps = componentsBySection[section];
          if (!comps) return null;
          const anchor = section.toLowerCase();
          return (
            <section key={section} id={anchor} className="-mx-3">
              <h2 className="text-lg font-medium mb-2 uppercase tracking-widest ml-4 text-muted-foreground/70">
                {section}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {comps.map((component) => (
                  <Button
                    key={component.id}
                    variant="ghost"
                    size="sm"
                    className="justify-start no-underline rounded-xl p-4 duration-500 hover:duration-75 active:scale-95 active:bg-primary/10"
                    asChild
                  >
                    <Link
                      href={`/${component.id}`}
                      className="flex flex-col gap-1 justify-start items-start"
                    >
                      <h3 className="text-xl font-medium text-primary">{component.name}</h3>
                      <p className="max-w-full text-wrap text-muted-foreground/70 text-sm">
                        {component.description}
                      </p>
                    </Link>
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
