import { Input } from "@/registry/new-york/blocks/input/input";

export default function InputDisabled() {
  return (
    <div className="w-full max-w-sm">
      <Input disabled placeholder="Disabled input" />
    </div>
  );
}
