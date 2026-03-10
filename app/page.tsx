import { HomepageComponentCard } from "@/components/homepage-component-card";
import { componentList, sectionOrder, type ComponentMeta } from "@/lib/component-registry";

export default function Home() {
  const componentsBySection = sectionOrder.reduce<Record<ComponentMeta["section"], ComponentMeta[]>>(
    (acc, section) => {
      acc[section] = [];
      return acc;
    },
    {} as Record<ComponentMeta["section"], ComponentMeta[]>
  );

  componentList.forEach((component) => {
    componentsBySection[component.section].push(component);
  });

  return (
    <div className="max-w-6xl mx-auto flex flex-col min-h-screen px-4 pt-8 gap-8">
      <header className="flex flex-col gap-3 px-1">
        <div className="text-sm text-muted-foreground">
          <span className="text-foreground">Components</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-semibold tracking-tight">Asanshay&apos;s components</h1>
            <p className="text-muted-foreground text-lg">
              A component library designed to be beautiful, easy to use, and LLM-ready.
            </p>
          </div>
        </div>
      </header>
      <main className="flex flex-col gap-8 px-1 pb-16">
        {/* Components index */}
        {sectionOrder.map((section) => {
          const comps = componentsBySection[section];
          if (!comps) return null;
          const anchor = section.toLowerCase();
          return (
            <section key={section} id={anchor} className="-mx-2">
              <h2 className="text-lg font-sans font-medium mb-2 uppercase tracking-widest ml-3 text-muted-foreground/70">
                {section}
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {comps.map((component) => (
                  <HomepageComponentCard key={component.id} component={component} />
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
