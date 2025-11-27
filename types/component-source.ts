export type ComponentSourceFile = {
  path: string;
  content: string;
};

export function isComponentSourceFile(value: unknown): value is ComponentSourceFile {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return typeof candidate.path === "string" && typeof candidate.content === "string";
}
