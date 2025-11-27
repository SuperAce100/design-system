import path from "path";
import { cache } from "react";
import { promises as fs } from "fs";

import { ComponentSourceFile, isComponentSourceFile } from "@/types/component-source";

const rootDir = process.cwd();
const demoDir = path.join(rootDir, "components", "demos");
const registryDir = path.join(rootDir, "public", "r");

async function readFileIfExists(filePath: string) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

async function getDemoSourceFile(id: string): Promise<ComponentSourceFile | null> {
  const candidates = [`${id}-demo.tsx`, `${id}.tsx`];
  for (const candidate of candidates) {
    const absolutePath = path.join(demoDir, candidate);
    const content = await readFileIfExists(absolutePath);
    if (content !== null) {
      return {
        path: path.posix.join("components", "demos", candidate),
        content,
      };
    }
  }
  return null;
}

async function getRegistrySourceFiles(id: string): Promise<ComponentSourceFile[]> {
  try {
    const filePath = path.join(registryDir, `${id}.json`);
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed?.files)) {
      return [];
    }

    return parsed.files.filter((file: unknown): file is ComponentSourceFile =>
      isComponentSourceFile(file)
    );
  } catch {
    return [];
  }
}

export const getComponentSourceFiles = cache(async function getComponentSourceFiles(
  id: string
): Promise<ComponentSourceFile[]> {
  const files: ComponentSourceFile[] = [];

  const demoFile = await getDemoSourceFile(id);
  if (demoFile) {
    files.push(demoFile);
  }

  const registryFiles = await getRegistrySourceFiles(id);
  for (const file of registryFiles) {
    if (!files.some((existing) => existing.path === file.path)) {
      files.push(file);
    }
  }

  return files;
});
