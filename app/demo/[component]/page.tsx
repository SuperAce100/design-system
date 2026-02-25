import { notFound } from "next/navigation";

import { getAllComponentIds, getDemoById } from "@/lib/component-registry";

export async function generateStaticParams() {
  return getAllComponentIds().map((id) => ({ component: id }));
}

export default async function DemoOnlyComponentPage({
  params,
}: {
  params: Promise<{ component: string }>;
}) {
  const { component: id } = await params;
  const demo = getDemoById(id);

  if (!demo) {
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
      <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 py-10">
        {demo}
      </main>
    </>
  );
}
