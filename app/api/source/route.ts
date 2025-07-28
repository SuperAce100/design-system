import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const filePath = url.searchParams.get("path");
  if (!filePath) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }
  const baseDir = process.cwd();
  const resolvedPath = path.join(baseDir, filePath);
  // Basic directory traversal protection
  if (!resolvedPath.startsWith(baseDir)) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }
  try {
    const data = await fs.readFile(resolvedPath, "utf8");
    return new NextResponse(data, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (err) {
    return NextResponse.json({ error: "File not found" + err }, { status: 404 });
  }
}
