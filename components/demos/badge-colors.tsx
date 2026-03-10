import { Badge } from "@/registry/new-york/blocks/badge/badge";

export default function BadgeColors() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge variant="regular" color="primary">Primary</Badge>
      <Badge variant="regular" color="emerald">Emerald</Badge>
      <Badge variant="regular" color="red">Red</Badge>
      <Badge variant="regular" color="amber">Amber</Badge>
      <Badge variant="regular" color="sky">Sky</Badge>
      <Badge variant="regular" color="indigo">Indigo</Badge>
      <Badge variant="regular" color="orange">Orange</Badge>
    </div>
  );
}
