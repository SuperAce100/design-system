import Reveal from "@/registry/new-york/blocks/reveal/reveal";

export default function RevealDemo() {
  return (
    <div className="flex flex-col gap-4 pt-6 items-center justify-center">
      <Reveal index={0}>
        <p className="text-5xl font-medium tracking-tight">This text</p>
      </Reveal>
      <Reveal index={1}>
        <p className="text-3xl font-medium tracking-tight">will be revealed</p>
      </Reveal>
      <Reveal index={2}>
        <p className="text-xl text-muted-foreground">when it comes into view.</p>
      </Reveal>
    </div>
  );
}
