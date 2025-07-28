import { JSXPreview } from "@/registry/new-york/blocks/jsx-preview/jsx-preview";

const jsx = `
<div className="flex flex-col gap-2 bg-muted rounded-xl p-6 border shadow-lg shadow-slate-200/50 items-center justify-center max-w-md">
  <h1 className="text-2xl font-bold">Hello, world!</h1>
  <p className="text-sm text-gray-500">This is a paragraph that would go in the middle of the page.</p>
</div>
`;

export default function JSXPreviewDemo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <JSXPreview jsx={jsx} />
    </div>
  );
}
