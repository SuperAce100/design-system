import { JSXPreview } from "@/registry/new-york/blocks/jsx-preview/jsx-preview";

const jsx = `
<div className="rounded-xl border bg-card p-5 shadow-sm">
  <h2 className="text-lg font-semibold">Generated card</h2>
  <p className="mt-2 text-sm text-muted-foreground">Rendered from a JSX string.</p>
</div>
`;

export default function JSXPreviewMainDemo() {
  return <JSXPreview jsx={jsx} />;
}
