import * as React from "react";
import { HelloWorld } from "@/registry/new-york/blocks/hello-world/hello-world";
import { ExampleForm } from "@/registry/new-york/blocks/example-form/example-form";
import PokemonPage from "@/registry/new-york/blocks/complex-component/page";
import { ExampleCard } from "@/registry/new-york/blocks/example-with-css/example-card";
import ComponentFrame from "@/components/component-frame";
import BadgeDemo from "@/components/demos/badge-demo";
import ButtonDemo from "@/components/demos/button-demo";
import RevealDemo from "@/components/demos/reveal-demo";
import CardDemo from "@/components/demos/card-demo";
import DescriptionListDemo from "@/components/demos/description-list-demo";
import PageHeaderDemo from "@/components/demos/page-header-demo";
import MotionBlurTextDemo from "@/components/demos/motion-blur-text";
import CodeBlockDemo from "@/components/demos/code-block-demo";
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
          title="Badge"
          componentName="badge"
          description="A simple badge component with an edible look."
        >
          <BadgeDemo />
        </ComponentFrame>
        <ComponentFrame
          title="Button"
          componentName="button"
          description="A simple button component with a fancy look."
        >
          <ButtonDemo />
        </ComponentFrame>
        <ComponentFrame
          title="Reveal"
          componentName="reveal"
          description="A simple reveal component with a fancy look."
        >
          <RevealDemo />
        </ComponentFrame>
        <ComponentFrame
          title="Card"
          componentName="card"
          description="A simple card component with a fancy look."
        >
          <CardDemo />
        </ComponentFrame>
        <ComponentFrame
          title="Description List"
          componentName="description-list"
          description="A simple description list component with a fancy look."
        >
          <DescriptionListDemo />
        </ComponentFrame>

        <ComponentFrame
          title="Page Header"
          componentName="page-header"
          description="A page header component with a fancy look."
        >
          <PageHeaderDemo />
        </ComponentFrame>

        <ComponentFrame
          title="Motion Blur Text"
          componentName="motion-blur-text"
          description="A motion blur text component with a fancy look."
        >
          <MotionBlurTextDemo />
        </ComponentFrame>

        <ComponentFrame
          title="Code Block"
          componentName="code-block"
          description="A code block component with a fancy look."
        >
          <CodeBlockDemo />
        </ComponentFrame>
      </main>
    </div>
  );
}
