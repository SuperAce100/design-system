import { Button } from "@/registry/new-york/blocks/button/button";

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
    </div>
  );
}
