## How to add components, make great demos, and design well

This guide shows how to:
- Add a new component to the registry (`registry.json`) and expose it as an installable item
- Create a high-quality demo that renders on the component page
- Follow effective design principles for components in this system

### How the registry works (quick mental model)
- The root `registry.json` defines installable items. Each item lists source `path`s and optional `target`s for consumers.
- During build, items are emitted to `public/r/[name].json` and served as installable registry entries.
- The docs pages read from `lib/component-registry.tsx` for local previews and demo wiring.
- Do not manually add or edit files in `public/r`. They are generated from `registry.json` by the build step.

Code touchpoints to be aware of:

```24:33:/Users/asanshaygupta/Documents/Codes/design-system/lib/component-registry.tsx
export type ComponentMeta = {
  id: string;
  name: string;
  section: "Primitives" | "AI" | "Effects";
  description: string;
};
```

```31:41:/Users/asanshaygupta/Documents/Codes/design-system/lib/component-registry.tsx
export const componentList: ComponentMeta[] = [
  {
    id: "window",
    name: "Window",
    section: "Primitives",
    description: "A draggable, resizable window inside a container.",
  },
  // ...
];
```

```161:186:/Users/asanshaygupta/Documents/Codes/design-system/lib/component-registry.tsx
const demoMap: Record<string, React.ReactNode> = {
  window: <WindowDemo />,
  // id: <YourDemo />
};

export function getDemoById(id: string): React.ReactNode | null {
  return demoMap[id] ?? null;
}
```

```87:109:/Users/asanshaygupta/Documents/Codes/design-system/app/[component]/page.tsx
<section id="installation" className="px-1">
  <h2 className="text-xl font-medium mb-2">Installation</h2>
  <p className="text-sm text-muted-foreground mb-3">Install using the shadcn CLI</p>
  {/* The on-page copy button points to the deployed registry URL */}
  {/* Locally you can fetch http://localhost:3000/r/[id].json */}
</section>
```

### 1) Add a new component to the registry
Use kebab-case for `name`/`id` (e.g., `fancy-toggle`). Provide a clear one-line `description` and minimal `dependencies`.

1. Create your source file(s):
   - Place component code under `registry/new-york/blocks/[id]/[id].tsx`.
   - If your item includes routes or multiple files, add them too under `registry/new-york/...`.

2. Add an entry to `registry.json` → `items[]`:

```json
{
  "name": "fancy-toggle",
  "type": "registry:component",
  "title": "Fancy Toggle",
  "description": "A tactile toggle with on/off states and keyboard support.",
  "dependencies": ["@radix-ui/react-slot", "class-variance-authority"],
  "registryDependencies": ["button"],
  "files": [
    {
      "path": "registry/new-york/blocks/fancy-toggle/fancy-toggle.tsx",
      "type": "registry:component",
      "target": "components/ui/fancy-toggle.tsx"
    }
  ]
}
```

3. Rebuild the registry files so consumers can install your component:
   - Run: `pnpm dlx shadcn@latest build`
   - Confirm the new artifact exists at: `public/r/fancy-toggle.json`
   - Locally you can fetch `http://localhost:3000/r/fancy-toggle.json` [[memory:4685016]]
   - Do not create `public/r/[id].json` (e.g., `button.json`) by hand. It is auto-generated.

4. If your component depends on other registry items, include them via `registryDependencies` and/or list their `files` as needed.

Reference item structure (example):

```279:291:/Users/asanshaygupta/Documents/Codes/design-system/public/r/registry.json
{
  "name": "button",
  "type": "registry:component",
  "title": "Button",
  "description": "A button component that *feels* good to use.",
  "dependencies": ["@radix-ui/react-slot", "class-variance-authority"],
  "files": [ { "path": "registry/new-york/blocks/button/button.tsx", "type": "registry:component", "target": "components/ui/button.tsx" } ]
}
```

### 2) Create a high-quality demo
The demo renders in the component’s page frame and should be deterministic, self-contained, and showcase the component’s primary states.

1. Create a demo file at `components/demos/[id]-demo.tsx`:

```tsx
import * as React from "react";
import { FancyToggle } from "@/components/ui/fancy-toggle";

export default function FancyToggleDemo() {
  const [on, setOn] = React.useState(false);
  return (
    <div className="flex items-center gap-4 p-4">
      <FancyToggle checked={on} onCheckedChange={setOn} aria-label="Enable feature" />
      <span className="text-sm text-muted-foreground">{on ? "On" : "Off"}</span>
    </div>
  );
}
```

2. Wire the demo into `lib/component-registry.tsx`:
   - Import your demo at the top.
   - Add `id: <YourDemo />` to `demoMap`.
   - Add a `ComponentMeta` entry to `componentList` with section and description.

```1:19:/Users/asanshaygupta/Documents/Codes/design-system/lib/component-registry.tsx
import FancyToggleDemo from "@/components/demos/fancy-toggle-demo";
// ... imports
```

```161:169:/Users/asanshaygupta/Documents/Codes/design-system/lib/component-registry.tsx
const demoMap: Record<string, React.ReactNode> = {
  // ... existing demos
  "fancy-toggle": <FancyToggleDemo />,
};
```

```33:41:/Users/asanshaygupta/Documents/Codes/design-system/lib/component-registry.tsx
export const componentList: ComponentMeta[] = [
  // ...
  {
    id: "fancy-toggle",
    name: "Fancy Toggle",
    section: "Primitives",
    description: "A tactile toggle with on/off states and keyboard support.",
  },
];
```

3. Visit `/[id]` (e.g., `/fancy-toggle`) to see the demo in the frame.

Demo quality checklist:
- Show 1–3 core states (default, hover/focus via visual hints, toggled/selected if applicable)
- Keep it deterministic (no network calls); if needed, stub in-memory data
- Respect a small footprint; avoid wrapping in unrelated containers
- Prefer realistic copy over lorem ipsum; keep text short
- Keyboard operable; confirm focus styles and ARIA labels are meaningful

### 3) Effective component design guidelines
Aim for components that are composable, accessible, predictable, and easy to install.

- API surface
  - Prefer clear, minimal props; avoid booleans that overlap in meaning
  - Support both controlled and uncontrolled modes where relevant
  - Accept `className` and forward refs; expose a stable DOM root via `data-slot`

- Accessibility
  - Keyboard support by default; manage focus states and tab order
  - Use correct ARIA roles/attributes; reflect state (e.g., `aria-pressed`, `aria-expanded`)
  - Leverage `@radix-ui/*` when primitives are complex

- Styling and variants
  - Use Tailwind classes with consistent tokens; prefer `class-variance-authority` for variants
  - Keep sensible defaults; don’t require consumers to pass many props for a good look
  - Expose only essential variants; document defaults in the demo

- Composition and naming
  - Favor composition over configuration; expose small building blocks
  - Name props descriptively; keep `id` (kebab-case) and `name` (Title Case) consistent with docs

- TypeScript and maintainability
  - Use strong types; avoid `any`; export prop types when helpful
  - For variants, use `VariantProps<typeof cva>`; keep public types stable
  - Keep files focused; export named components (e.g., `export { Button }`)

- Performance
  - Avoid unnecessary state/effects; memoize expensive UI if needed
  - Keep re-renders tight; pass stable callbacks and values

### 4) Quick end-to-end checklist
- Add source under `registry/new-york/blocks/[id]/[id].tsx`
- Register item in `registry.json` with `files`, `dependencies`, and optional `target`
- Build registry and verify `public/r/[id].json` is created
- Create `components/demos/[id]-demo.tsx`
- Import demo and register in `demoMap`; add `componentList` meta (section + description)
- Browse `/[id]` and validate UX, a11y, and visuals

If you have questions or a tricky case (e.g., multi-file items, routes, or API-backed demos), mirror how `chat`, `chat-message`, and `markdown` are structured in both `registry.json` and `lib/component-registry.tsx`.


