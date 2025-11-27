"use client";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/registry/new-york/blocks/code-block/code-block";
import React from "react";

type RegistryFile = {
  path: string;
  content: string;
};

function isRegistryFile(file: unknown): file is RegistryFile {
  if (!file || typeof file !== "object") {
    return false;
  }

  const candidate = file as Record<string, unknown>;
  return typeof candidate.path === "string" && typeof candidate.content === "string";
}

function formatFileLabel(path: string) {
  return path.replace(/^registry\/new-york\//, "");
}

function findPreferredFile(
  files: RegistryFile[],
  componentName: string,
  preferredPath?: string
) {
  if (preferredPath) {
    const explicit = files.find((file) => file.path === preferredPath);
    if (explicit) return explicit;
  }

  const exactBlockMatch = files.find((file) =>
    file.path.includes(`/blocks/${componentName}/`)
  );
  if (exactBlockMatch) return exactBlockMatch;

  const fallbackPath = `registry/new-york/blocks/${componentName}/${componentName}.tsx`;
  const fallbackMatch = files.find((file) => file.path === fallbackPath);
  if (fallbackMatch) return fallbackMatch;

  return files[0];
}

export default function ComponentFrame({
  children,
  className,
  id,
  componentName,
  source,
  sourcePath,
}: {
  children: React.ReactNode;
  id?: string;
  componentName: string;
  className?: string;
  source?: string;
  sourcePath?: string;
}) {
  const [activeTab, setActiveTab] = React.useState<"demo" | "source">("demo");
  const [code, setCode] = React.useState<string | null>(source || null);
  const [files, setFiles] = React.useState<RegistryFile[]>([]);
  const [selectedPath, setSelectedPath] = React.useState<string | null>(sourcePath ?? null);
  const [isLoadingSource, setIsLoadingSource] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setCode(source || null);
  }, [source]);

  React.useEffect(() => {
    if (
      activeTab !== "source" ||
      source ||
      files.length ||
      isLoadingSource ||
      error
    ) {
      return;
    }

    let isMounted = true;

    async function loadSource() {
      setIsLoadingSource(true);
      setError(null);
      try {
        const res = await fetch(`/r/${encodeURIComponent(componentName)}.json`);
        if (!res.ok) {
          throw new Error("Failed to load source");
        }
        const data = await res.json();
        const registryFiles: RegistryFile[] = Array.isArray(data?.files)
          ? data.files.filter((file: unknown): file is RegistryFile => isRegistryFile(file))
          : [];

        if (!registryFiles.length) {
          throw new Error("No source files available");
        }

        if (!isMounted) return;

        setFiles(registryFiles);
        const preferredFile = findPreferredFile(registryFiles, componentName, sourcePath);
        if (preferredFile) {
          setSelectedPath(preferredFile.path);
          setCode(preferredFile.content);
        } else {
          setError("No source files available");
        }
      } catch (err) {
        if (!isMounted) return;
        setError(
          err instanceof Error && err.message ? err.message : "Unable to load source"
        );
      } finally {
        if (isMounted) {
          setIsLoadingSource(false);
        }
      }
    }

    loadSource();

    return () => {
      isMounted = false;
    };
  }, [activeTab, componentName, error, files.length, isLoadingSource, source, sourcePath]);

  React.useEffect(() => {
    if (!files.length || !selectedPath) return;
    const nextFile = files.find((file) => file.path === selectedPath);
    if (nextFile) {
      setCode(nextFile.content);
    }
  }, [files, selectedPath]);

  const handleFileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPath(event.target.value);
  };

  const handleRetry = () => {
    setError(null);
    setFiles([]);
    setSelectedPath(sourcePath ?? null);
    setCode(source || null);
  };

  const renderSource = () => {
    if (error) {
      return (
        <div className="text-sm text-destructive/80 bg-destructive/10 rounded-lg p-3 flex flex-col gap-2">
          <span>{error}</span>
          <button
            type="button"
            onClick={handleRetry}
            className="self-start text-xs font-medium text-destructive underline-offset-4 hover:underline"
          >
            Try again
          </button>
        </div>
      );
    }

    if (isLoadingSource && !code) {
      return <div className="text-sm text-muted-foreground">Loading source…</div>;
    }

    if (!code) {
      return <div className="text-sm text-muted-foreground">Source unavailable.</div>;
    }

    return <CodeBlock code={code} language="tsx" className="mt-0" variant="flat" />;
  };
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border dark:border-none rounded-3xl p-6 relative bg-card shadow-xl dark:shadow-none shadow-gray-300/20",
        className
      )}
      id={id}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab("demo")}
            className={cn(
              "text-xl font-medium rounded-md transition-colors",
              activeTab === "demo"
                ? "text-foreground"
                : "text-muted-foreground/50 hover:text-foreground/80"
            )}
          >
            Preview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("source")}
            className={cn(
              "text-xl font-medium rounded-md transition-colors",
              activeTab === "source"
                ? "text-foreground"
                : "text-muted-foreground/50 hover:text-foreground/80"
            )}
          >
            Code
          </button>
        </div>
        {activeTab === "source" && files.length > 1 ? (
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            File
            <select
              value={selectedPath ?? ""}
              onChange={handleFileChange}
              className="rounded-md border border-border bg-transparent px-2 py-1 text-xs font-mono text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {files.map((file) => (
                <option key={file.path} value={file.path} className="bg-background text-foreground">
                  {formatFileLabel(file.path)}
                </option>
              ))}
            </select>
          </label>
        ) : null}
      </div>
      {activeTab === "demo" ? (
        <div className="flex flex-col items-center justify-center min-h-[360px] relative h-full">
          {children}
        </div>
      ) : (
        <div className="relative max-h-[360px] overflow-y-auto rounded-xl">
          {renderSource()}
        </div>
      )}
    </div>
  );
}
