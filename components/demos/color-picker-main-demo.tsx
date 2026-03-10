import { ColorPicker } from "@/registry/new-york/blocks/color-picker/color-picker";

export default function ColorPickerMainDemo() {
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <ColorPicker defaultValue="oklch(0.6847 0.1479 237.32)" format="oklch" presets="tailwind" />
    </div>
  );
}
