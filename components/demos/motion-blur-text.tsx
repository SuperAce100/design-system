import MotionBlurText from "@/registry/new-york/motion-blur-text/motion-blur-text";

export default function MotionBlurTextDemo() {
  return (
    <div className="space-y-4 w-full">
      <MotionBlurText
        color="black"
        bidirectional={true}
        className="text-6xl font-medium tracking-tight text-center"
      >
        Motion Blur Text
      </MotionBlurText>
    </div>
  );
}
