import { cn } from "@/lib/utils";
import { ScriptCopyBtn } from "@/components/magicui/script-copy-btn";

const BASE_URL = "https://ds.asanshay.com/r/";

export default function ComponentFrame({
  children,
  className,
  title,
  description,
  id,
  componentName,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  id?: string;
  componentName: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border rounded-3xl p-6 min-h-[450px] relative bg-card shadow-xl shadow-gray-300/20",
        className
      )}
      id={id}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold">{title}</h2>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        <ScriptCopyBtn
          className=""
          commandMap={{
            npm: `npx shadcn@latest add ${BASE_URL}${componentName}`,
            yarn: `yarn shadcn@latest add ${BASE_URL}${componentName}`,
            pnpm: `pnpm dlx shadcn@latest add ${BASE_URL}${componentName}`,
            bun: `bunx shadcn@latest add ${BASE_URL}${componentName}`,
          }}
        />
      </div>
      <div className="flex items-center justify-center min-h-[400px] relative">{children}</div>
    </div>
  );
}
