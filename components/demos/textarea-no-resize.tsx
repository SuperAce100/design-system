import { Textarea } from "@/registry/new-york/blocks/textarea/textarea";

export default function TextareaNoResize() {
  return <Textarea placeholder="No resize handle..." showHandle={false} className="max-w-sm min-h-32" />;
}
