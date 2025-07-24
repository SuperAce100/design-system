import * as React from "react";
import { OpenInV0Button } from "@/components/open-in-v0-button";
import { HelloWorld } from "@/registry/new-york/blocks/hello-world/hello-world";
import { ExampleForm } from "@/registry/new-york/blocks/example-form/example-form";
import PokemonPage from "@/registry/new-york/blocks/complex-component/page";
import { ExampleCard } from "@/registry/new-york/blocks/example-with-css/example-card";
import ComponentFrame from "@/components/component-frame";
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
