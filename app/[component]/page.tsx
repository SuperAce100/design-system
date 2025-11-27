import { notFound } from "next/navigation";
import {
  getAllComponentIds,
  getComponentMeta,
  getDemoById,
  sectionOrder,
  componentList,
} from "@/lib/component-registry";
import ComponentDocsPage from "@/components/component-docs-page";

export async function generateStaticParams() {
  return getAllComponentIds().map((id) => ({ component: id }));
}

export default async function ComponentPage({
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

  const sections = sectionOrder
    .map((section) => ({
      title: section,
      components: componentList.filter((component) => component.section === section),
    }))
    .filter((section) => section.components.length > 0);

  return (
    <ComponentDocsPage
      meta={meta}
      demo={demo}
      sections={sections}
    />
  );
}
