import { Input } from "@/registry/new-york/blocks/input/input";

export default function InputWithLabel() {
  return (
    <div className="w-full max-w-sm space-y-1.5">
      <label htmlFor="email" className="text-sm font-medium">Email</label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  );
}
