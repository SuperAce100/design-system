import * as React from "react";
import { OpenInV0Button } from "@/components/open-in-v0-button";
import { HelloWorld } from "@/registry/new-york/blocks/hello-world/hello-world";
import { ExampleForm } from "@/registry/new-york/blocks/example-form/example-form";
import PokemonPage from "@/registry/new-york/blocks/complex-component/page";
import { ExampleCard } from "@/registry/new-york/blocks/example-with-css/example-card";
import ComponentFrame from "@/components/component-frame";
import { Badge } from "@/registry/new-york/blocks/badge/badge";
// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Custom Registry</h1>
        <p className="text-muted-foreground">
          A custom registry for distributing code using shadcn.
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-8">
        <ComponentFrame title="Badge" componentName="badge" description="A simple badge component">
          <div className="flex max-w-xs flex-col gap-8 px-4">
            <div className="w-full space-y-2">
              <h3 className="w-full text-2xl font-medium tracking-tight">Edible</h3>
              <div className="flex w-full flex-row flex-wrap items-center justify-start gap-2">
                <Badge
                  variant="fancy"
                  color="primary"
                  className="hover:rotate-2 hover:scale-105"
                  showDot={true}
                >
                  Available
                </Badge>
                <Badge
                  variant="fancy"
                  color="emerald"
                  className="hover:rotate-2 hover:scale-105"
                  showDot={true}
                >
                  Available
                </Badge>
                <Badge
                  variant="fancy"
                  color="red"
                  className="hover:rotate-2 hover:scale-105"
                  showDot={true}
                >
                  <span className="text-xs font-normal text-red-600">Disabled</span>
                </Badge>
                <Badge
                  variant="fancy"
                  color="amber"
                  className="hover:rotate-2 hover:scale-105"
                  showDot={true}
                >
                  <span className="text-xs font-normal text-amber-600">Warning</span>
                </Badge>
                <Badge
                  variant="fancy"
                  color="sky"
                  className="hover:rotate-2 hover:scale-105"
                  showDot={true}
                >
                  <span className="text-xs font-normal text-sky-600">Ready</span>
                </Badge>
                <Badge
                  variant="fancy"
                  color="indigo"
                  className="hover:rotate-2 hover:scale-105"
                  showDot={true}
                >
                  <span className="text-xs font-normal text-indigo-600">Upgraded</span>
                </Badge>
                <Badge
                  variant="fancy"
                  color="orange"
                  className="hover:rotate-2 hover:scale-105"
                  showDot={true}
                >
                  <span className="text-xs font-normal text-orange-600">Paused</span>
                </Badge>
              </div>
            </div>
            <div className="w-full space-y-2">
              <h3 className="w-full text-2xl font-medium tracking-tight">Regular</h3>
              <div className="flex w-full flex-row flex-wrap items-center justify-start gap-2">
                <div className="group flex w-fit flex-row items-center justify-center gap-1 rounded-lg bg-emerald-100 px-1.5 py-0.5 transition-all duration-300 hover:scale-105 hover:rotate-2 hover:bg-emerald-200">
                  <div className="h-2 w-2 origin-center rounded-full bg-emerald-400"></div>
                  <span className="text-xs font-normal text-emerald-600">Available</span>
                </div>
                <div className="group flex w-fit flex-row items-center justify-center gap-1 rounded-lg bg-red-100 px-1.5 py-0.5 transition-all duration-300 hover:scale-105 hover:-rotate-2 hover:bg-red-200">
                  <div className="h-2 w-2 origin-center rounded-full bg-red-400"></div>
                  <span className="text-xs font-normal text-red-600">Disabled</span>
                </div>
                <div className="group flex w-fit flex-row items-center justify-center gap-1 rounded-lg bg-amber-100 px-1.5 py-0.5 transition-all duration-300 hover:scale-105 hover:rotate-2 hover:bg-amber-200">
                  <div className="h-2 w-2 origin-center rounded-full bg-amber-400"></div>
                  <span className="text-xs font-normal text-amber-600">Warning</span>
                </div>
                <div className="group flex w-fit flex-row items-center justify-center gap-1 rounded-lg bg-sky-100 px-1.5 py-0.5 transition-all duration-300 hover:scale-105 hover:-rotate-2 hover:bg-sky-200">
                  <div className="h-2 w-2 origin-center rounded-full bg-sky-400"></div>
                  <span className="text-xs font-normal text-sky-600">Ready</span>
                </div>
                <div className="group flex w-fit flex-row items-center justify-center gap-1 rounded-lg bg-indigo-100 px-1.5 py-0.5 transition-all duration-300 hover:scale-105 hover:rotate-2 hover:bg-indigo-200">
                  <div className="h-2 w-2 origin-center rounded-full bg-indigo-400"></div>
                  <span className="text-xs font-normal text-indigo-600">Upgraded</span>
                </div>
                <div className="group flex w-fit flex-row items-center justify-center gap-1 rounded-lg bg-orange-100 px-1.5 py-0.5 transition-all duration-300 hover:scale-105 hover:-rotate-2 hover:bg-orange-200">
                  <div className="h-2 w-2 origin-center rounded-full bg-orange-400"></div>
                  <span className="text-xs font-normal text-orange-600">Paused</span>
                </div>
              </div>
            </div>
            <div className="w-full space-y-2">
              <h3 className="w-full text-2xl font-medium tracking-tight">Outline</h3>
              <div className="flex w-full flex-row flex-wrap items-center justify-start gap-2">
                <div className="group flex w-fit flex-row items-center justify-center gap-1 rounded-lg border border-emerald-400 px-1.5 py-0.5 transition-all duration-300 hover:scale-105 hover:rotate-2 hover:bg-emerald-100">
                  <div className="h-2 w-2 origin-center rounded-full bg-emerald-400"></div>
                  <span className="text-xs font-normal text-emerald-600">Available</span>
                </div>
                <div className="group flex w-fit flex-row items-center justify-center gap-1 rounded-lg border border-red-400 px-1.5 py-0.5 transition-all duration-300 hover:scale-105 hover:-rotate-2 hover:bg-red-100">
                  <div className="h-2 w-2 origin-center rounded-full bg-red-400"></div>
                  <span className="text-xs font-normal text-red-600">Disabled</span>
                </div>
                <div className="group flex w-fit flex-row items-center justify-center gap-1 rounded-lg border border-amber-400 px-1.5 py-0.5 transition-all duration-300 hover:scale-105 hover:rotate-2 hover:bg-amber-100">
                  <div className="h-2 w-2 origin-center rounded-full bg-amber-400"></div>
                  <span className="text-xs font-normal text-amber-600">Warning</span>
                </div>
                <div className="group flex w-fit flex-row items-center justify-center gap-1 rounded-lg border border-sky-400 px-1.5 py-0.5 transition-all duration-300 hover:scale-105 hover:-rotate-2 hover:bg-sky-100">
                  <div className="h-2 w-2 origin-center rounded-full bg-sky-400"></div>
                  <span className="text-xs font-normal text-sky-600">Ready</span>
                </div>
                <div className="group flex w-fit flex-row items-center justify-center gap-1 rounded-lg border border-indigo-400 px-1.5 py-0.5 transition-all duration-300 hover:scale-105 hover:rotate-2 hover:bg-indigo-100">
                  <div className="h-2 w-2 origin-center rounded-full bg-indigo-400"></div>
                  <span className="text-xs font-normal text-indigo-600">Upgraded</span>
                </div>
                <div className="group flex w-fit flex-row items-center justify-center gap-1 rounded-lg border border-orange-400 px-1.5 py-0.5 transition-all duration-300 hover:scale-105 hover:-rotate-2 hover:bg-orange-100">
                  <div className="h-2 w-2 origin-center rounded-full bg-orange-400"></div>
                  <span className="text-xs font-normal text-orange-600">Paused</span>
                </div>
              </div>
            </div>
          </div>
        </ComponentFrame>
        <ComponentFrame
          title="Hello World"
          componentName="hello-world"
          description="A simple hello world component"
        >
          <HelloWorld />
        </ComponentFrame>

        <ComponentFrame
          title="Contact Form"
          componentName="example-form"
          description="A contact form with Zod validation"
        >
          <ExampleForm />
        </ComponentFrame>

        <ComponentFrame
          title="Complex Component"
          componentName="complex-component"
          description="A complex component showing hooks, libs and components."
        >
          <PokemonPage />
        </ComponentFrame>

        <ComponentFrame
          title="Login Form"
          componentName="example-with-css"
          description="A login form with a CSS file"
        >
          <ExampleCard />
        </ComponentFrame>
      </main>
    </div>
  );
}
