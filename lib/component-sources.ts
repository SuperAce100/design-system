import path from "path";
import { cache } from "react";
import { promises as fs } from "fs";

import { ComponentSourceFile, isComponentSourceFile } from "@/types/component-source";

export const getComponentSourceFiles = cache(async function getComponentSourceFiles(
  id: string
): Promise<ComponentSourceFile[]> {
  try {
    const filePath = path.join(process.cwd(), "public", "r", `${id}.json`);
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
});
