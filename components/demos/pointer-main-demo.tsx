import { Pointer, PointerLayer } from "@/registry/new-york/blocks/pointer/pointer";

export default function PointerMainDemo() {
  return (
    <PointerLayer className="relative h-[260px] w-full max-w-xl rounded-2xl border border-dashed border-border bg-background">
      <Pointer x={120} y={96} thoughts="Ready" />
    </PointerLayer>
  );
}
