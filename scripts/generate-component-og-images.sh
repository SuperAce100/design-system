#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BASE_URL="${BASE_URL:-http://localhost:3105}"
OUT_DIR="$ROOT_DIR/public/og/components"
TMP_DIR="$ROOT_DIR/.tmp/og-components"

if ! command -v npx >/dev/null 2>&1; then
  echo "npx is required to run playwright-cli."
  exit 1
fi

if ! curl -fsS "$BASE_URL" >/dev/null 2>&1; then
  echo "App is not reachable at $BASE_URL. Start the dev server first."
  echo "Example: npm run dev -- --port 3105"
  exit 1
fi

export CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"

pw() {
  npx --yes --package @playwright/cli playwright-cli "$@"
}

mkdir -p "$OUT_DIR" "$TMP_DIR"

meta_file="$TMP_DIR/component-meta.tsv"

node - <<'NODE' > "$meta_file"
const fs = require("fs");
const path = require("path");

const sourcePath = path.join(process.cwd(), "lib", "component-registry.tsx");
const source = fs.readFileSync(sourcePath, "utf8");
const re = /\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",/g;
const rows = [];
for (const match of source.matchAll(re)) {
  rows.push(`${match[1]}\t${match[2]}`);
}
process.stdout.write(rows.join("\n"));
NODE

mapfile_output="$(cat "$meta_file")"

if [ -z "$mapfile_output" ]; then
  echo "No component entries found in lib/component-registry.tsx"
  exit 1
fi

theme_json='{"neutral":"slate","primary":"sky","radius":0.75,"backgroundShade":0,"shadowDepth":35,"shadowOpacity":14}'

pw close-all >/dev/null 2>&1 || true
pw open "$BASE_URL" >/dev/null
pw resize 1200 630 >/dev/null

while IFS=$'\t' read -r id name; do
  [ -n "$id" ] || continue
  out="$OUT_DIR/$id.png"

  pw goto "$BASE_URL" >/dev/null
  pw localstorage-set theme light >/dev/null
  pw localstorage-set theme-config "$theme_json" >/dev/null
  pw goto "$BASE_URL/demo/$id" >/dev/null
  pw reload >/dev/null
  pw run-code 'async (page) => { await page.waitForTimeout(180); }' >/dev/null
  pw screenshot --filename "$out" >/dev/null

  echo "Generated $out"
done <<< "$mapfile_output"

pw close >/dev/null

echo "Component Open Graph images generated in $OUT_DIR"
