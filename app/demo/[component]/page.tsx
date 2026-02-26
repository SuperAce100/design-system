import { notFound } from "next/navigation";
import { Inter_Tight } from "next/font/google";

import { getAllComponentIds, getComponentMeta, getDemoById } from "@/lib/component-registry";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["400", "500", "600", "700"],
});

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

  const scaleByComponent: Record<string, number> = {
    badge: 1.5,
    "chat-input": 1.5,
    "color-picker": 1.5,
    "page-header": 1.5,
    card: 1,
    "chat-message": 1,
    "code-block": 1,
    "description-list": 1,
    pointer: 1,
    window: 1,
    markdown: 0.5,
  };
  const scale = scaleByComponent[id] ?? 2;
  const needsFlexColumnParent = id === "pointer" || id === "window";

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
        className={`relative h-screen w-screen overflow-hidden bg-background ${interTight.variable}`}
        style={{
          fontFamily:
            '"SF Pro Display","SF Pro Text","SF Pro",var(--font-inter-tight),-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
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
          <div
            className="flex min-h-[40vh] min-w-[40vw] origin-center items-center justify-center"
            style={{ transform: `scale(${scale})` }}
          >
            {needsFlexColumnParent ? (
              <div className="flex h-[40vh] w-[40vw] flex-col">{demo}</div>
            ) : (
              demo
            )}
          </div>
        </div>
      </main>
    </>
  );
}
