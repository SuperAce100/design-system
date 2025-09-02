"use client";
import { Badge } from "@/registry/new-york/blocks/badge/badge";
import { Button } from "@/registry/new-york/blocks/button/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/registry/new-york/blocks/card/card";
import { DescriptionList } from "@/registry/new-york/blocks/description-list/description-list";

export default function OverviewExample() {
  return (
    <section className="px-1 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      {/* Left: no Card wrapper, just content */}
      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-medium tracking-tight">Product Overview</h3>
        <p className="text-sm text-muted-foreground">
          Composable primitives you can ship with confidence.
        </p>
        <div className="flex items-center gap-2">
          <Badge variant="fancy" color="primary">
            Stable
          </Badge>
          <Badge variant="regular" color="sky">
            Type Safe
          </Badge>
          <Badge variant="regular" color="emerald">
            Accessible
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="default">Get Started</Button>
          <Button variant="outline">Explore Components</Button>
          <Button variant="ghost">Docs</Button>
        </div>
      </div>

      {/* Right: description list within a subtle surface */}
      <div className="rounded-2xl border bg-card p-4">
        <div className="mb-2">
          <div className="text-lg font-medium">Plan Details</div>
          <div className="text-muted-foreground text-sm">What you get out of the box.</div>
        </div>
        <DescriptionList
          layout="stacked"
          data={{
            Theme: "Light / Dark, system-aware",
            Styling: "Tailwind + shadcn",
            Components: "Buttons, Cards, Inputs, Markdown, Chat",
            License: "MIT",
          }}
        />
      </div>
    </section>
  );
}
