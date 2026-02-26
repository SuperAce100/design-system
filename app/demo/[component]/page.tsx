import { notFound } from "next/navigation";

import { getAllComponentIds, getComponentMeta, getDemoById } from "@/lib/component-registry";

export async function generateStaticParams() {
  return getAllComponentIds().map((id) => ({ component: id }));
}

export default async function DemoOnlyComponentPage({
  params,
}: {
  params: Promise<{ component: string }>;
}) {
  const { component: id } = await params;
  const meta = getComponentMeta(id);
  const demo = getDemoById(id);

  if (!meta || !demo) {
    notFound();
  }

  return (
    <>
      <style>
        {`
          body > div.fixed.top-4.right-4.flex.items-center.gap-1.z-50 {
            display: none !important;
          }
          nextjs-portal,
          [data-nextjs-toast],
          [data-next-badge-root],
          [data-nextjs-dev-tools-button],
          [data-nextjs-dev-indicator],
          #nextjs-dev-tools-menu {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
          }
        `}
      </style>
      <main
        className="relative h-screen w-screen overflow-hidden bg-background"
        style={{
          fontFamily:
            '"SF Pro Display","SF Pro Text","SF Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
        }}
      >
        <div className="absolute left-12 top-10 text-[50px] leading-none">
          <span style={{ color: "#737373" }}>Components / </span>
          <span className="text-foreground">{meta.name}</span>
        </div>
        <div className="absolute bottom-10 right-12 text-[50px] leading-none text-foreground">
          ds.asanshay.com
        </div>
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="flex min-h-[40vh] min-w-[40vw] origin-center scale-[2] items-center justify-center">
            {demo}
          </div>
        </div>
      </main>
    </>
  );
}
