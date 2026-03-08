import type { ReactNode } from "react";
import Link from "next/link";

import type { ComponentMeta } from "@/lib/component-registry";
import { cn } from "@/lib/utils";

type HomepageComponentCardProps = {
  component: ComponentMeta;
};

const sectionBadgeStyles: Record<ComponentMeta["section"], string> = {
  Primitives: "border-primary/15 bg-primary/10 text-primary",
  AI: "border-primary/20 bg-primary/10 text-primary",
  Effects: "border-primary/15 bg-primary/10 text-primary",
};

export function HomepageComponentCard({ component }: HomepageComponentCardProps) {
  return (
    <Link
      href={`/${component.id}`}
      className="group relative flex min-h-[15rem] flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/90 p-3 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 active:scale-[0.99]"
    >
      <PreviewShell section={component.section}>{renderComponentPreview(component.id)}</PreviewShell>

      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-medium tracking-tight text-primary">{component.name}</h3>
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em]",
              sectionBadgeStyles[component.section]
            )}
          >
            {component.section}
          </span>
        </div>
        <p className="mt-2 line-clamp-3 text-sm leading-snug text-muted-foreground/80">
          {component.description}
        </p>
        <div className="mt-auto pt-4 text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
          Explore component
        </div>
      </div>
    </Link>
  );
}

function PreviewShell({
  section,
  children,
}: {
  section: ComponentMeta["section"];
  children: ReactNode;
}) {
  const sectionGlow: Record<ComponentMeta["section"], string> = {
    Primitives: "from-primary/10 via-transparent to-transparent",
    AI: "from-primary/15 via-primary/5 to-transparent",
    Effects: "from-primary/10 via-transparent to-primary/10",
  };

  return (
    <div className="relative isolate flex h-32 overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-background via-background to-muted/40 p-3">
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-80 transition-transform duration-500 group-hover:scale-105",
          sectionGlow[section]
        )}
      />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/80 via-background/25 to-transparent" />
      <div className="absolute -right-5 -top-6 h-16 w-16 rounded-full bg-primary/10 blur-2xl transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
      <div className="relative z-10 flex h-full w-full items-center justify-center">{children}</div>
    </div>
  );
}

function PreviewFrame({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border/70 bg-background/90 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5",
        className
      )}
    >
      {children}
    </div>
  );
}

function Line({ className }: { className?: string }) {
  return <div className={cn("h-1.5 rounded-full bg-foreground/12", className)} />;
}

function Dot({ className }: { className?: string }) {
  return <div className={cn("size-2 rounded-full bg-foreground/20", className)} />;
}

function Chip({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-full border border-border/70 bg-background/90 px-2 py-1 text-[10px] font-medium text-muted-foreground shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

function MiniButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5",
        className
      )}
    >
      {children}
    </div>
  );
}

function MiniWindow({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <PreviewFrame className={cn("overflow-hidden", className)}>
      <div className="flex items-center gap-1.5 border-b border-border/70 px-2 py-1">
        <Dot className="bg-rose-300/70" />
        <Dot className="bg-amber-300/70" />
        <Dot className="bg-emerald-300/70" />
        <div className="ml-1 text-[9px] font-medium text-muted-foreground">{title}</div>
      </div>
      <div className="space-y-1.5 p-2">{children}</div>
    </PreviewFrame>
  );
}

function MiniBubble({
  align = "left",
  className,
  children,
}: {
  align?: "left" | "right";
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex", align === "right" ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[78%] rounded-2xl border px-2.5 py-1.5 text-[10px] shadow-sm",
          align === "right"
            ? "border-primary/20 bg-primary/10 text-primary"
            : "border-border/70 bg-background/95 text-muted-foreground",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

function renderComponentPreview(id: string) {
  switch (id) {
    case "window":
      return (
        <div className="relative h-full w-full">
          <MiniWindow title="Notes" className="absolute left-0 top-2 w-28 rotate-[-4deg]">
            <Line className="w-3/4" />
            <Line className="w-full" />
            <Line className="w-2/3" />
          </MiniWindow>
          <MiniWindow title="Preview" className="absolute right-0 top-8 w-32 rotate-[3deg]">
            <Line className="w-4/5" />
            <Line className="w-full" />
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <div className="h-6 rounded bg-primary/10" />
              <div className="h-6 rounded bg-primary/15" />
              <div className="h-6 rounded bg-primary/20" />
            </div>
          </MiniWindow>
        </div>
      );
    case "badge":
      return (
        <div className="flex w-full flex-wrap items-center justify-center gap-2">
          <Chip className="border-primary/20 bg-primary/10 text-primary">New</Chip>
          <Chip>Stable</Chip>
          <Chip className="bg-background/95">Draft</Chip>
          <Chip className="border-primary/20 bg-primary/10 text-primary">AI-ready</Chip>
        </div>
      );
    case "button":
      return (
        <div className="flex w-full flex-wrap items-center justify-center gap-2">
          <MiniButton>Fancy</MiniButton>
          <MiniButton className="bg-background text-foreground">Default</MiniButton>
          <MiniButton className="border-border bg-background/90 text-muted-foreground">Outline</MiniButton>
          <MiniButton className="border-transparent bg-primary/5 text-primary">Ghost</MiniButton>
        </div>
      );
    case "long-press-button":
      return (
        <PreviewFrame className="w-full max-w-[15rem] p-2">
          <div className="rounded-full border border-primary/20 bg-background p-1">
            <div className="relative overflow-hidden rounded-full bg-primary/10 px-3 py-2 text-center text-[10px] font-medium text-primary">
              <div className="absolute inset-y-0 left-0 w-3/4 rounded-full bg-primary/15 transition-all duration-500 group-hover:w-full" />
              <span className="relative">Hold to confirm</span>
            </div>
          </div>
        </PreviewFrame>
      );
    case "code-block":
      return (
        <PreviewFrame className="w-full max-w-[15rem] overflow-hidden">
          <div className="flex items-center gap-1 border-b border-border/70 px-2 py-1">
            <Dot className="bg-rose-300/70" />
            <Dot className="bg-amber-300/70" />
            <Dot className="bg-emerald-300/70" />
            <div className="ml-auto rounded bg-primary/10 px-1.5 py-0.5 text-[9px] text-primary">llms.py</div>
          </div>
          <div className="space-y-1.5 bg-muted/20 p-3 font-mono text-[9px]">
            <Line className="w-4/5 bg-primary/20" />
            <Line className="w-full" />
            <Line className="w-11/12" />
            <Line className="w-3/5 bg-primary/15" />
            <Line className="w-10/12" />
          </div>
        </PreviewFrame>
      );
    case "markdown":
      return (
        <PreviewFrame className="w-full max-w-[15rem] p-3">
          <div className="space-y-2">
            <Line className="h-2 w-1/2 bg-primary/20" />
            <Line className="w-full" />
            <Line className="w-4/5" />
            <div className="space-y-1 pt-1">
              <div className="flex items-center gap-2">
                <Dot className="size-1.5 bg-primary/30" />
                <Line className="w-3/5" />
              </div>
              <div className="flex items-center gap-2">
                <Dot className="size-1.5 bg-primary/30" />
                <Line className="w-2/3" />
              </div>
            </div>
            <div className="rounded-md bg-muted/40 p-2">
              <Line className="w-5/6 bg-primary/15" />
            </div>
          </div>
        </PreviewFrame>
      );
    case "select":
      return (
        <div className="w-full max-w-[13rem] space-y-2">
          <PreviewFrame className="flex items-center justify-between px-3 py-2">
            <Line className="w-1/2" />
            <div className="text-[10px] text-muted-foreground">v</div>
          </PreviewFrame>
          <PreviewFrame className="space-y-1.5 p-2">
            <div className="rounded-md bg-primary/10 px-2 py-1 text-[10px] text-primary">Default</div>
            <div className="rounded-md px-2 py-1 text-[10px] text-muted-foreground">Compact</div>
            <div className="rounded-md px-2 py-1 text-[10px] text-muted-foreground">Minimal</div>
          </PreviewFrame>
        </div>
      );
    case "input":
      return (
        <PreviewFrame className="w-full max-w-[15rem] p-2.5">
          <div className="rounded-xl border border-border/70 bg-background px-3 py-2">
            <div className="flex items-center gap-2">
              <Line className="h-2 w-1/3" />
              <div className="h-4 w-px bg-primary/40 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </div>
        </PreviewFrame>
      );
    case "number-input":
      return (
        <PreviewFrame className="w-full max-w-[15rem] p-2">
          <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-background px-2 py-2">
            <div className="rounded-md border border-border/70 px-2 py-1 text-[10px] text-muted-foreground">-</div>
            <div className="flex-1 text-center text-[11px] font-medium text-foreground">42</div>
            <div className="flex flex-col gap-0.5">
              <div className="h-1 w-5 rounded-full bg-primary/25" />
              <div className="h-1 w-5 rounded-full bg-primary/15" />
            </div>
            <div className="rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] text-primary">
              +
            </div>
          </div>
        </PreviewFrame>
      );
    case "command-prompt":
      return (
        <PreviewFrame className="w-full max-w-[15rem] overflow-hidden">
          <div className="border-b border-border/70 px-2 py-1 text-[9px] text-muted-foreground">command</div>
          <div className="space-y-2 p-3 font-mono text-[9px]">
            <div className="flex items-center gap-2">
              <span className="text-primary">$</span>
              <Line className="w-2/3 bg-primary/20" />
            </div>
            <div className="space-y-1 rounded-md bg-muted/30 p-2">
              <div className="rounded bg-primary/10 px-2 py-1 text-primary">deploy preview</div>
              <div className="px-2 py-1 text-muted-foreground">restart dev</div>
            </div>
          </div>
        </PreviewFrame>
      );
    case "invisible-input":
      return (
        <PreviewFrame className="w-full max-w-[15rem] p-3">
          <div className="text-sm text-foreground">
            Ask me anything about
            <span className="mx-1 inline-block border-b border-primary/40 px-0.5 text-primary">
              design systems
            </span>
            <span className="inline-block h-4 w-px translate-y-0.5 bg-primary/50" />
          </div>
        </PreviewFrame>
      );
    case "textarea":
      return (
        <PreviewFrame className="w-full max-w-[15rem] p-2">
          <div className="rounded-xl border border-border/70 bg-background p-3">
            <div className="space-y-1.5">
              <Line className="w-full" />
              <Line className="w-11/12" />
              <Line className="w-4/5" />
              <Line className="w-2/3" />
            </div>
            <div className="mt-3 text-right text-[9px] text-muted-foreground">120 / 280</div>
          </div>
        </PreviewFrame>
      );
    case "card":
      return (
        <div className="relative h-full w-full">
          <PreviewFrame className="absolute left-2 top-8 w-24 rotate-[-6deg] p-2">
            <Line className="w-2/3 bg-primary/18" />
            <Line className="mt-2 w-full" />
            <Line className="w-4/5" />
          </PreviewFrame>
          <PreviewFrame className="absolute left-16 top-4 w-28 rotate-[4deg] p-2 shadow-md">
            <Line className="w-1/2 bg-primary/20" />
            <Line className="mt-2 w-full" />
            <Line className="w-3/4" />
          </PreviewFrame>
          <PreviewFrame className="absolute right-2 top-10 w-24 rotate-[8deg] border-primary/20 bg-primary/10 p-2">
            <Line className="w-3/5 bg-primary/25" />
            <Line className="mt-2 w-full bg-primary/15" />
          </PreviewFrame>
        </div>
      );
    case "description-list":
      return (
        <PreviewFrame className="w-full max-w-[15rem] p-3">
          <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-[10px]">
            <div className="text-muted-foreground">Tone</div>
            <div className="font-medium text-foreground">Minimal</div>
            <div className="text-muted-foreground">State</div>
            <div className="font-medium text-foreground">Ready</div>
            <div className="text-muted-foreground">Theme</div>
            <div className="font-medium text-foreground">Semantic</div>
          </div>
        </PreviewFrame>
      );
    case "page-header":
      return (
        <PreviewFrame className="w-full max-w-[15rem] p-3">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1.5">
                <Line className="h-2 w-20 bg-primary/20" />
                <Line className="w-28" />
              </div>
              <MiniButton className="px-2 py-1">Publish</MiniButton>
            </div>
            <div className="flex gap-2 pt-1">
              <Chip>Draft</Chip>
              <Chip>v2</Chip>
            </div>
          </div>
        </PreviewFrame>
      );
    case "chat":
      return (
        <PreviewFrame className="w-full max-w-[15rem] p-2">
          <div className="space-y-2">
            <MiniBubble>Summarize this component.</MiniBubble>
            <MiniBubble align="right">It is clean, themeable, and ready for agents.</MiniBubble>
            <div className="rounded-xl border border-border/70 bg-background px-3 py-2 text-[10px] text-muted-foreground">
              Reply with a demo idea...
            </div>
          </div>
        </PreviewFrame>
      );
    case "chat-input":
      return (
        <PreviewFrame className="w-full max-w-[15rem] p-2">
          <div className="space-y-2">
            <div className="flex gap-1.5">
              <Chip className="text-primary">GPT-4.1</Chip>
              <Chip>Claude</Chip>
              <Chip>Gemini</Chip>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-border/70 bg-background px-3 py-2">
              <div className="text-sm text-muted-foreground">+</div>
              <Line className="flex-1" />
              <div className="rounded-full bg-primary/12 px-2 py-1 text-[10px] text-primary">Send</div>
            </div>
          </div>
        </PreviewFrame>
      );
    case "chat-message":
      return (
        <div className="w-full max-w-[15rem] space-y-2">
          <MiniBubble className="rounded-md">Can you explain the API?</MiniBubble>
          <MiniBubble align="right" className="rounded-2xl">
            It supports markdown, tool calls, and reasoning blocks.
          </MiniBubble>
          <MiniBubble className="rounded-md border-primary/20 bg-primary/10 text-foreground">
            <Line className="mb-1.5 w-12 bg-primary/20" />
            <Line className="w-full" />
          </MiniBubble>
        </div>
      );
    case "chat-reasoning":
      return (
        <PreviewFrame className="w-full max-w-[15rem] p-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-lg border border-border/70 bg-background px-3 py-2 text-[10px]">
              <span className="font-medium text-foreground">Reasoning</span>
              <span className="text-muted-foreground">42 tokens</span>
            </div>
            <div className="rounded-lg border border-border/70 bg-muted/20 p-2">
              <Line className="w-full" />
              <Line className="mt-1.5 w-4/5" />
              <div className="mt-2 rounded-md bg-primary/10 px-2 py-1 text-[10px] text-primary">
                {"calculator -> 42"}
              </div>
            </div>
          </div>
        </PreviewFrame>
      );
    case "chat-tool":
      return (
        <div className="grid w-full max-w-[15rem] grid-cols-2 gap-2">
          <PreviewFrame className="p-2">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Dot className="bg-amber-400/80" />
              calculator
            </div>
            <Line className="mt-2 w-full" />
          </PreviewFrame>
          <PreviewFrame className="p-2">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Dot className="bg-emerald-400/80" />
              weather
            </div>
            <Line className="mt-2 w-3/4" />
          </PreviewFrame>
          <PreviewFrame className="col-span-2 p-2">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Dot className="bg-rose-400/80" />
              search
            </div>
            <Line className="mt-2 w-5/6" />
          </PreviewFrame>
        </div>
      );
    case "jsx-preview":
      return (
        <div className="grid w-full max-w-[15rem] grid-cols-[1fr_auto_1fr] items-center gap-2">
          <PreviewFrame className="space-y-1.5 p-2 font-mono text-[9px]">
            <Line className="w-5/6 bg-primary/20" />
            <Line className="w-full" />
            <Line className="w-2/3" />
          </PreviewFrame>
          <div className="text-xs text-primary transition-transform duration-300 group-hover:translate-x-0.5">
            {"->"}
          </div>
          <PreviewFrame className="space-y-1.5 p-2">
            <Line className="w-2/3 bg-primary/20" />
            <Line className="w-full" />
          </PreviewFrame>
        </div>
      );
    case "pointer":
      return (
        <PreviewFrame className="relative flex h-24 w-full max-w-[15rem] items-center justify-center border-dashed bg-background/80">
          <div className="absolute left-9 top-7 rounded-full border border-border/70 bg-background px-2 py-1 text-[10px] text-muted-foreground shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
            On it
          </div>
          <div className="absolute left-1/2 top-1/2 h-7 w-5 -translate-x-1/2 -translate-y-1/2 rotate-[18deg] rounded-tl-sm rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] border border-foreground/10 bg-primary/85 shadow-lg shadow-primary/20" />
        </PreviewFrame>
      );
    case "reveal":
      return (
        <div className="space-y-1 text-center font-medium tracking-tight">
          <div className="text-lg text-foreground transition-transform duration-300 group-hover:-translate-y-0.5">
            This text
          </div>
          <div className="text-sm text-foreground/75 transition-transform duration-300 group-hover:-translate-y-1">
            reveals itself
          </div>
          <div className="text-xs text-muted-foreground transition-transform duration-300 group-hover:-translate-y-1.5">
            as it enters view
          </div>
        </div>
      );
    case "motion-blur-text":
      return (
        <div className="relative text-2xl font-semibold tracking-tight text-foreground">
          <div className="absolute inset-0 translate-x-1 text-primary/20 blur-[2px] transition-transform duration-300 group-hover:translate-x-2">
            Motion
          </div>
          <div className="absolute inset-0 -translate-x-1 text-foreground/15 blur-[3px] transition-transform duration-300 group-hover:-translate-x-2">
            Motion
          </div>
          <div className="relative">Motion</div>
        </div>
      );
    case "loader":
      return (
        <div className="flex items-center gap-4">
          <div className="size-7 rounded-full border-2 border-primary/25 border-t-primary motion-safe:animate-spin" />
          <div className="size-5 rounded-full bg-primary/20 shadow-lg shadow-primary/10 motion-safe:animate-pulse" />
          <div className="size-7 rounded-full border border-primary/20 bg-primary/10" />
        </div>
      );
    case "morphing-text":
      return (
        <div className="relative text-center">
          <div className="absolute inset-0 text-2xl font-semibold tracking-tight text-primary/20 blur-[5px]">
            hello
          </div>
          <div className="relative text-2xl font-semibold tracking-tight text-foreground">hey there</div>
          <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">smooth text swap</div>
        </div>
      );
    case "ascii-wave":
      return (
        <PreviewFrame className="w-full max-w-[15rem] overflow-hidden bg-background/95 p-2 font-mono text-[8px] leading-3 text-foreground/55">
          <div className="space-y-1 transition-transform duration-500 group-hover:-translate-y-0.5">
            <div>~ ~ ~~ ~ / / ~ ~ ~~ ~</div>
            <div className="translate-x-2 text-primary/60">/ / ~~~ ~ / / ~~~ ~ /</div>
            <div className="-translate-x-1">~ ~~ / / ~ ~~ / / ~ ~~</div>
            <div className="translate-x-3 text-primary/60">/ / ~~~ ~ / / ~~~ ~ /</div>
            <div>~ ~ ~~ ~ / / ~ ~ ~~ ~</div>
          </div>
        </PreviewFrame>
      );
    case "color-picker":
      return (
        <PreviewFrame className="w-full max-w-[15rem] p-2">
          <div className="flex gap-3">
            <div className="h-16 w-16 rounded-lg border border-border/70 bg-[linear-gradient(135deg,_white,_#ff79c6,_#60a5fa)]" />
            <div className="flex-1 space-y-2">
              <div className="h-3 rounded-full bg-[linear-gradient(90deg,_#ef4444,_#f59e0b,_#84cc16,_#06b6d4,_#8b5cf6,_#ef4444)]" />
              <div className="h-3 rounded-full bg-[linear-gradient(90deg,_transparent,_#000000)]" />
              <div className="flex gap-1">
                <div className="size-4 rounded-full bg-[#0ea5e9]" />
                <div className="size-4 rounded-full bg-[#8b5cf6]" />
                <div className="size-4 rounded-full bg-[#22c55e]" />
                <div className="size-4 rounded-full bg-[#f97316]" />
              </div>
            </div>
          </div>
        </PreviewFrame>
      );
    default:
      return (
        <PreviewFrame className="w-full max-w-[15rem] p-3">
          <div className="space-y-2">
            <Line className="w-2/3 bg-primary/20" />
            <Line className="w-full" />
            <Line className="w-4/5" />
          </div>
        </PreviewFrame>
      );
  }
}
