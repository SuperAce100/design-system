import path from "path";
import { cache } from "react";
import { promises as fs } from "fs";

import { ComponentSourceFile } from "@/types/component-source";

const rootDir = process.cwd();
const demoDir = path.join(rootDir, "components", "demos");

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

export const getComponentSourceFiles = cache(async function getComponentSourceFiles(
  id: string
): Promise<ComponentSourceFile[]> {
  const demoFile = await getDemoSourceFile(id);
  return demoFile ? [demoFile] : [];
});
