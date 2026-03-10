import path from "path";
import { cache } from "react";
import { promises as fs } from "fs";

import { ComponentSourceFile } from "@/types/component-source";

const rootDir = process.cwd();

async function readFileIfExists(filePath: string) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

async function getDemoSourceFile(id: string): Promise<ComponentSourceFile | null> {
  const demoDir = path.join(rootDir, "components", "demos");
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

export const getComponentSourceFiles = cache(async function getComponentSourceFiles(
  id: string
): Promise<ComponentSourceFile[]> {
  const demoFile = await getDemoSourceFile(id);
  return demoFile ? [demoFile] : [];
});

export const getDemoSource = cache(async function getDemoSource(
  filePath: string
): Promise<string | null> {
  const absolutePath = path.join(rootDir, filePath);
  return readFileIfExists(absolutePath);
});

export const getDemoSources = cache(async function getDemoSources(
  filePaths: string[]
): Promise<Record<string, string>> {
  const results: Record<string, string> = {};
  await Promise.all(
    filePaths.map(async (filePath) => {
      const content = await getDemoSource(filePath);
      if (content !== null) {
        results[filePath] = content;
      }
    })
  );
  return results;
});
