import { NumberInput } from "@/registry/new-york/blocks/number-input/number-input";

export default function NumberInputMainDemo() {
  return <NumberInput className="w-32" defaultValue={3} min={0} max={10} step={1} aria-label="Seats" />;
}
