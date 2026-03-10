import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllComponentIds,
  getComponentMeta,
  getDemoById,
  getComponentDemos,
  sectionOrder,
  componentList,
} from "@/lib/component-registry";
import { getDemoSources } from "@/lib/component-sources";
import ComponentDocsPage from "@/components/component-docs-page";

export async function generateStaticParams() {
  return getAllComponentIds().map((id) => ({ component: id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ component: string }>;
}): Promise<Metadata> {
  const { component: id } = await params;
  const meta = getComponentMeta(id);

  if (!meta) {
    return {};
  }

  const title = `${meta.name} | Asanshay's components`;
  const description = meta.description;
  const image = `/og/components/${id}.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${meta.name} component preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ component: string }>;
}) {
  const { component: id } = await params;
  const meta = getComponentMeta(id);
  const demos = getComponentDemos(id);
  const previewDemo = getDemoById(id);

  if (!meta || !demos || !previewDemo) {
    notFound();
  }

  const filePaths = [
    demos.main.file,
    ...(demos.examples ?? []).map((e) => e.file),
  ];
  const sources = await getDemoSources(filePaths);

  const mainDemo = {
    name: demos.main.name,
    description: demos.main.description,
    component: demos.main.component,
    source: sources[demos.main.file],
  };

  const examples = (demos.examples ?? []).map((ex) => ({
    name: ex.name,
    description: ex.description,
    component: ex.component,
    source: sources[ex.file],
  }));

  const sections = sectionOrder
    .map((section) => ({
      title: section,
      components: componentList.filter((component) => component.section === section),
    }))
    .filter((section) => section.components.length > 0);

  return (
    <ComponentDocsPage
      meta={meta}
      mainDemo={mainDemo}
      examples={examples}
      sections={sections}
    />
  );
}
