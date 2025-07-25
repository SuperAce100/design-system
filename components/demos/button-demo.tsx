import { Button } from "@/registry/new-york/blocks/button/button";
import { Plus } from "lucide-react";

export default function ButtonDemo() {
  return (
    <div className="flex flex-col gap-4 pt-6">
      <div className="flex max-w-xs flex-row flex-wrap items-center justify-center gap-2">
        <Button variant="fancy">Fancy</Button>
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-row items-center justify-between gap-12 max-w-xs p-8">
        <div className="flex max-w-xs flex-col flex-wrap items-center justify-center gap-2">
          <Button variant="default" size="iconSm">
            <Plus />
          </Button>
          <Button variant="default" size="icon">
            <Plus />
          </Button>
          <Button variant="default" size="iconLg">
            <Plus />
          </Button>
        </div>
        <div className="flex max-w-xs flex-col flex-wrap items-center justify-center gap-2">
          <Button variant="default" size="xs">
            <Plus />
            Tiny
          </Button>
          <Button variant="default" size="sm">
            <Plus />
            Small
          </Button>
          <Button variant="default">
            <Plus />
            Medium
          </Button>
          <Button variant="default" size="lg">
            <Plus />
            Large
          </Button>
          <Button variant="default" size="xl">
            <Plus />
            Massive
          </Button>
        </div>
      </div>
    </div>
  );
}
