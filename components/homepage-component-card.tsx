import Link from "next/link";

import {
  getDemoById,
  getDemoLayoutById,
  type ComponentMeta,
} from "@/lib/component-registry";
import { cn } from "@/lib/utils";

type HomepageComponentCardProps = {
  component: ComponentMeta;
};

const sectionGlowStyles: Record<ComponentMeta["section"], string> = {
  Primitives: "from-primary/10 via-transparent to-transparent",
  AI: "from-primary/15 via-primary/5 to-transparent",
  Effects: "from-primary/10 via-transparent to-primary/10",
};

export function HomepageComponentCard({ component }: HomepageComponentCardProps) {
  const demo = getDemoById(component.id);
  const layout = getDemoLayoutById(component.id);
  const homepageScale = layout.homepageScale ?? 0.64;

  return (
    <Link
      href={`/${component.id}`}
      className="group flex min-h-[19rem] flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/90 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
    >
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-70 transition-transform duration-500 group-hover:scale-105",
            sectionGlowStyles[component.section]
          )}
        />

        {demo ? (
          <div
            aria-hidden="true"
            inert={true}
            className="absolute inset-0 overflow-hidden pointer-events-none select-none"
          >
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                marginLeft: layout.homepageOffsetX ?? 0,
                marginTop: layout.homepageOffsetY ?? 0,
              }}
            >
              <div
                className="origin-center transition-transform duration-300 group-hover:scale-[1.02]"
                style={{ transform: `scale(${homepageScale})` }}
              >
                {layout.needsFlexColumnParent ? (
                  <div
                    className={cn(
                      "flex h-[18rem] w-[18rem] flex-col items-center justify-center",
                      layout.homepageContainerClassName
                    )}
                  >
                    {demo}
                  </div>
                ) : (
                  <div className={layout.homepageContainerClassName}>{demo}</div>
                )}
              </div>
            </div>
          </div>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-4">
        <h3 className="text-lg font-medium tracking-tight text-primary transition-opacity group-hover:opacity-80">
          {component.name}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-snug text-muted-foreground/80">
          {component.description}
        </p>
      </div>
    </Link>
  );
}
