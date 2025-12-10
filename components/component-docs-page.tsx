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
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [containerWidth, setContainerWidth] = React.useState(0);

  // Flatten all components for the bottom bar
  const allComponents = React.useMemo(
    () => sections.flatMap((section) => section.components),
    [sections]
  );

  // Track scroll position for the circular effect
  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollPosition(container.scrollLeft);
    };

    const handleResize = () => {
      setContainerWidth(container.offsetWidth);
    };

    handleResize();
    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Scroll to active item on mount
  React.useEffect(() => {
    if (activeItemRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeItem = activeItemRef.current;
      const cWidth = container.offsetWidth;
      const itemLeft = activeItem.offsetLeft;
      const itemWidth = activeItem.offsetWidth;

      container.scrollTo({
        left: itemLeft - cWidth / 2 + itemWidth / 2,
        behavior: "instant",
      });
    }
  }, [activeId]);

  // Calculate transform for each item based on its position relative to center
  const getItemTransform = (element: HTMLElement | null) => {
    if (!element || !containerWidth) return { transform: "", opacity: 1, scale: 1 };

    const itemLeft = element.offsetLeft;
    const itemWidth = element.offsetWidth;
    const itemCenter = itemLeft + itemWidth / 2 - scrollPosition;
    const viewportCenter = containerWidth / 2;
    const distanceFromCenter = itemCenter - viewportCenter;
    const maxDistance = containerWidth / 2;

    // Normalize distance (-1 to 1)
    const normalizedDistance = Math.max(-1, Math.min(1, distanceFromCenter / maxDistance));

    // Calculate rotation (items rotate like on a disk)
    const rotateY = normalizedDistance * 45;
    const rotateZ = normalizedDistance * -8;

    // Calculate scale (center items are larger)
    const scale = 1 - Math.abs(normalizedDistance) * 0.15;

    // Calculate vertical offset (creates the arc)
    const translateY = Math.abs(normalizedDistance) * 20;

    // Calculate opacity
    const opacity = 1 - Math.abs(normalizedDistance) * 0.4;

    return {
      transform: `perspective(800px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translateY(${translateY}px) scale(${scale})`,
      opacity,
      scale,
    };
  };

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:hidden transition-all duration-300 ease-out",
        isExpanded ? "pb-6" : "pb-2"
      )}
    >
      {/* Collapse/Expand handle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute left-1/2 -translate-x-1/2 -top-3 z-10 flex items-center justify-center w-12 h-6 rounded-t-xl bg-background border border-b-0 text-muted-foreground hover:text-foreground transition-colors"
        aria-label={isExpanded ? "Collapse menu" : "Expand menu"}
      >
        <svg
          className={cn(
            "w-4 h-4 transition-transform duration-300",
            isExpanded ? "rotate-180" : ""
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* Disk rotation container */}
      <div
        className={cn(
          "relative overflow-hidden transition-all duration-300 ease-out",
          isExpanded ? "h-32" : "h-16"
        )}
        style={{ perspective: "800px" }}
      >
        <div
          ref={scrollContainerRef}
          className="flex items-center overflow-x-auto scrollbar-hide px-4 gap-3 h-full"
          style={{
            paddingLeft: `calc(50% - 60px)`,
            paddingRight: `calc(50% - 60px)`,
          }}
        >
          {allComponents.map((component) => {
            const isActive = component.id === activeId;
            return (
              <MobileNavItem
                key={component.id}
                component={component}
                isActive={isActive}
                isExpanded={isExpanded}
                activeRef={isActive ? activeItemRef : undefined}
                getItemTransform={getItemTransform}
                scrollPosition={scrollPosition}
              />
            );
          })}
        </div>

        {/* Center indicator line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent pointer-events-none" />
      </div>
    </nav>
  );
}

function MobileNavItem({
  component,
  isActive,
  isExpanded,
  activeRef,
  getItemTransform,
  scrollPosition,
}: {
  component: ComponentMeta;
  isActive: boolean;
  isExpanded: boolean;
  activeRef?: React.Ref<HTMLAnchorElement>;
  getItemTransform: (element: HTMLElement | null) => { transform: string; opacity: number; scale: number };
  scrollPosition: number;
}) {
  const itemRef = React.useRef<HTMLAnchorElement>(null);
  const [style, setStyle] = React.useState({ transform: "", opacity: 1 });

  // Combine refs
  const setRefs = React.useCallback(
    (node: HTMLAnchorElement | null) => {
      itemRef.current = node;
      if (activeRef && typeof activeRef === "function") {
        activeRef(node);
      } else if (activeRef && typeof activeRef === "object") {
        (activeRef as React.MutableRefObject<HTMLAnchorElement | null>).current = node;
      }
    },
    [activeRef]
  );

  // Update transform on scroll
  React.useEffect(() => {
    const result = getItemTransform(itemRef.current);
    setStyle({ transform: result.transform, opacity: result.opacity });
  }, [scrollPosition, getItemTransform]);

  return (
    <Link
      ref={setRefs}
      href={`/${component.id}`}
      className={cn(
        "flex-shrink-0 rounded-2xl px-5 text-sm font-medium transition-all duration-150 whitespace-nowrap flex flex-col items-center justify-center gap-1 text-center",
        isExpanded ? "py-4 min-w-[100px]" : "py-2",
        isActive
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
      style={{
        transform: style.transform,
        opacity: style.opacity,
        transformStyle: "preserve-3d",
      }}
    >
      <span className={cn("transition-all", isExpanded ? "text-base font-semibold" : "text-sm")}>
        {component.name}
      </span>
      {isExpanded && (
        <span className="text-xs opacity-70 max-w-[120px] truncate">
          {component.description}
        </span>
      )}
    </Link>
  );
}
