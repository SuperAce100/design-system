import { cn } from "@/lib/utils";
import { OpenInV0Button } from "@/components/open-in-v0-button";

export default function ComponentFrame({
  children,
  className,
  title,
  description,
  componentName,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  componentName: string;
  className?: string;
}) {
  return (
    <div
      className={cn("flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative", className)}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm text-muted-foreground sm:pl-3">{title}</h2>
        <OpenInV0Button name={componentName} className="w-fit" />
      </div>
      {description && <p className="text-sm text-muted-foreground sm:pl-3">{description}</p>}
      <div className="flex items-center justify-center min-h-[400px] relative">{children}</div>
    </div>
  );
}
