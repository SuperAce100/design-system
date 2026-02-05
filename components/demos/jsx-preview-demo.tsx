import { JSXPreview } from "@/registry/new-york/blocks/jsx-preview/jsx-preview";

const jsx = `
<div className="flex flex-col gap-2 bg-card rounded-xl p-6 border shadow-lg items-center justify-center max-w-md">
  <h1 className="text-2xl font-bold">Hello, world!</h1>
  <p className="text-sm text-muted-foreground">This is a paragraph that would go in the middle of the page.</p>
</div>
`;

export default function JSXPreviewDemo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <JSXPreview jsx={jsx} />
    </div>
  );
}
