import { LongPressButton } from "@/registry/new-york/blocks/long-press-button/long-press-button";

export default function LongPressButtonMainDemo() {
  return (
    <LongPressButton aria-label="Archive item" className="rounded-full px-5 py-2.5">
      Hold to archive
    </LongPressButton>
  );
}
