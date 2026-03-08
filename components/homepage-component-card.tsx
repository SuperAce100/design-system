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

const sectionBadgeStyles: Record<ComponentMeta["section"], string> = {
  Primitives: "border-primary/15 bg-primary/10 text-primary",
  AI: "border-primary/20 bg-primary/10 text-primary",
  Effects: "border-primary/15 bg-primary/10 text-primary",
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
    <article className="group flex min-h-[19rem] flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/90 p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5">
      <div className="relative h-44 overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-background via-background to-muted/30">
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

      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-medium tracking-tight text-primary">
              <Link
                href={`/${component.id}`}
                className="rounded-sm outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                {component.name}
              </Link>
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-snug text-muted-foreground/80">
              {component.description}
            </p>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em]",
              sectionBadgeStyles[component.section]
            )}
          >
            {component.section}
          </span>
        </div>

        <div className="mt-auto pt-4">
          <Link
            href={`/${component.id}`}
            className="inline-flex items-center rounded-full border border-border/70 bg-background/90 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/20 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            Explore component
          </Link>
        </div>
      </div>
    </article>
  );
}
