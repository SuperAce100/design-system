import { InvisibleInput } from "@/registry/new-york/blocks/invisible-input/invisible-input";

export default function InvisibleInputMainDemo() {
  return (
    <InvisibleInput
      defaultValue="Edit this inline title"
      aria-label="Inline title"
      className="text-2xl font-semibold tracking-tight text-foreground"
    />
  );
}
