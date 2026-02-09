import { NumberInput } from "@/registry/new-york/blocks/number-input/number-input";

export default function NumberInputDemo() {
  return <NumberInput className="w-2xs" defaultValue={12} min={0} max={100} step={1} aria-label="Quantity" />;
}
