import { Button } from "@/registry/new-york/blocks/button/button";

export default function ButtonDisabled() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button disabled>Disabled</Button>
      <Button variant="outline" disabled>Disabled</Button>
      <Button variant="secondary" disabled>Disabled</Button>
    </div>
  );
}
