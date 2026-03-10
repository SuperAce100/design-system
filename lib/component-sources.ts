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

const getSourceFileByPath = cache(async function getSourceFileByPath(
  relativePath: string
): Promise<ComponentSourceFile | null> {
  const normalizedPath = relativePath.replace(/^components\/demos\//, "");
  const absolutePath = path.join(demoDir, normalizedPath);
  const content = await readFileIfExists(absolutePath);

  if (content === null) {
    return null;
  }

  return {
    path: path.posix.join("components", "demos", normalizedPath),
    content,
  };
});

export async function getComponentSourceFiles(
  relativePaths: string[]
): Promise<Record<string, ComponentSourceFile>> {
  const uniquePaths = Array.from(new Set(relativePaths));
  const sourceFiles = await Promise.all(
    uniquePaths.map(async (relativePath) => {
      const sourceFile = await getSourceFileByPath(relativePath);
      return sourceFile ? [relativePath, sourceFile] : null;
    })
  );

  return Object.fromEntries(sourceFiles.filter((entry): entry is [string, ComponentSourceFile] => entry !== null));
}
