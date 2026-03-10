import { NumberInput } from "@/registry/new-york/blocks/number-input/number-input";

export default function NumberInputBounds() {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium whitespace-nowrap">Opacity (%)</label>
      <NumberInput className="w-28" defaultValue={75} min={0} max={100} step={5} aria-label="Opacity" />
    </div>
  );
}
