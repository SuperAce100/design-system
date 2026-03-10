import Link from "next/link";

import { getDemoById, getDemoLayoutById, type ComponentMeta } from "@/lib/component-registry";
import { cn } from "@/lib/utils";
import { Card } from "@/registry/new-york/blocks/card/card";

type HomepageComponentCardProps = {
  component: ComponentMeta;
};

export function HomepageComponentCard({ component }: HomepageComponentCardProps) {
  const demo = getDemoById(component.id);
  const layout = getDemoLayoutById(component.id);
  const homepageScale = layout.homepageScale ?? 0.64;

  return (
    <Link
      href={`/${component.id}`}
      className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 "
    >
      <Card
        variant="outline"
        className="gap-0 overflow-hidden p-0 transition-all duration-300 border-none group-hover: h-full bg-card group-focus-visible:border-primary "
      >
        <div className="relative h-48 overflow-hidden">
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
                  className="origin-center transition-transform duration-300 group-hover:scale-[1.05]"
                  style={{ transform: `scale(${homepageScale})` }}
                >
                  {layout.needsFlexColumnParent ? (
                    <div
                      className={cn(
                        "flex h-[18rem] w-[18rem] flex-col items-center justify-center",
                        layout.homepageContainerClassName,
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

          <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t via-card/80 from-card to-transparent flex items-end justify-end px-4 pb-4">
            <h3 className="text-2xl font-medium tracking-tight font-heading transition-opacity group-hover:opacity-80 text-right">
              {component.name}
            </h3>
          </div>
        </div>
      </Card>
    </Link>
  );
}
