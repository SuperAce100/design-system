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

if command -v magick >/dev/null 2>&1; then
  IM_CMD="magick"
elif command -v convert >/dev/null 2>&1; then
  IM_CMD="convert"
else
  echo "ImageMagick is required (magick/convert not found)."
  exit 1
fi

if ! curl -fsS "$BASE_URL" >/dev/null 2>&1; then
  echo "App is not reachable at $BASE_URL. Start the dev server first."
  echo "Example: npm run dev -- --port 3105"
  exit 1
fi

export CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
PWCLI="$CODEX_HOME/skills/playwright/scripts/playwright_cli.sh"

if [ ! -x "$PWCLI" ]; then
  echo "Playwright wrapper not found at $PWCLI"
  exit 1
fi

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

"$PWCLI" close-all >/dev/null 2>&1 || true
"$PWCLI" open "$BASE_URL" >/dev/null
"$PWCLI" resize 1600 1000 >/dev/null

while IFS=$'\t' read -r id name; do
  [ -n "$id" ] || continue
  raw="$TMP_DIR/$id.png"
  out="$OUT_DIR/$id.png"

  "$PWCLI" goto "$BASE_URL" >/dev/null
  "$PWCLI" localstorage-set theme light >/dev/null
  "$PWCLI" localstorage-set theme-config "$theme_json" >/dev/null
  "$PWCLI" goto "$BASE_URL/demo/$id" >/dev/null
  "$PWCLI" reload >/dev/null
  "$PWCLI" run-code 'async (page) => { await page.waitForTimeout(140); }' >/dev/null
  "$PWCLI" screenshot --filename "$raw" >/dev/null

  "$IM_CMD" "$raw" \
    -resize 1200x630^ \
    -gravity center \
    -extent 1200x630 \
    \( -size 1200x280 gradient:none-black \) \
    -gravity south \
    -compose over \
    -composite \
    -gravity southwest \
    -fill white \
    -stroke "rgba(0,0,0,0.25)" \
    -strokewidth 2 \
    -pointsize 68 \
    -annotate +58+108 "$name" \
    -stroke none \
    -fill "rgba(255,255,255,0.92)" \
    -pointsize 34 \
    -annotate +60+50 "ds.asanshay.com" \
    "$out"

  echo "Generated $out"
done <<< "$mapfile_output"

"$PWCLI" close >/dev/null

echo "Component Open Graph images generated in $OUT_DIR"
