import { Badge } from "@/registry/new-york/blocks/badge/badge";

export default function BadgeWithDot() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge variant="fancy" color="emerald" showDot>Online</Badge>
      <Badge variant="fancy" color="amber" showDot>Away</Badge>
      <Badge variant="fancy" color="red" showDot>Offline</Badge>
    </div>
  );
}
