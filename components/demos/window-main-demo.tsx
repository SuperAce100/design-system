import { Window, WindowContainer } from "@/registry/new-york/blocks/window/window";

export default function WindowMainDemo() {
  return (
    <WindowContainer className="h-[320px] w-full max-w-2xl rounded-2xl border border-dashed border-border bg-background">
      <Window title="Notes" initialX={32} initialY={32} initialWidth={320} initialHeight={176}>
        <p className="text-sm text-muted-foreground">
          Drag the header to move the window and resize from the edges.
        </p>
      </Window>
    </WindowContainer>
  );
}
