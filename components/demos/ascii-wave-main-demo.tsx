import { AsciiWave } from "@/registry/new-york/blocks/ascii-wave/ascii-wave";

export default function AsciiWaveMainDemo() {
  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-2xl border border-border/50 bg-white">
      <AsciiWave leftImage="/images/backgrounds/mountain-l-color.png" rightImage="/images/backgrounds/mountain-r-color.png">
        <div className="flex h-full items-center justify-center">
          <h1 className="px-6 text-center text-3xl font-semibold tracking-tight text-foreground">
            Simplicity wins
          </h1>
        </div>
      </AsciiWave>
    </div>
  );
}
