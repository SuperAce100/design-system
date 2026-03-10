import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllComponentIds,
  getComponentMeta,
  sectionOrder,
  componentList,
} from "@/lib/component-registry";
import { getComponentPageDemos } from "@/lib/component-demos";
import { getComponentSourceFiles } from "@/lib/component-sources";
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
  const demos = getComponentPageDemos(id);
  const sourceFilesByPath = await getComponentSourceFiles(demos.map((demo) => demo.sourcePath));

  if (!meta || demos.length === 0) {
    notFound();
  }

  const demosWithSource = demos.map((demo) => ({
    ...demo,
    sourceFiles: sourceFilesByPath[demo.sourcePath] ? [sourceFilesByPath[demo.sourcePath]] : [],
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
      demos={demosWithSource}
      sections={sections}
    />
  );
}
