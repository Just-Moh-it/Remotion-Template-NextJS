import { remotionConfig } from "@/config/remotion";
import { createCompConfig } from "@/types/remotion";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  showFrameCount: z.boolean(),
});

function HelloWorldComp({ name, showFrameCount }: z.infer<typeof schema>) {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="bg-black items-center justify-center">
      <h1 className="text-white text-6xl font-bold">
        Hello {name} {showFrameCount && frame}
      </h1>
    </AbsoluteFill>
  );
}

export const helloWorldConfig = createCompConfig({
  id: "hello-world",
  durationInFrames: remotionConfig.fps * 10,
  schema,
  component: HelloWorldComp as React.FC,
  defaultProps: { showFrameCount: true, name: "World!" },
});
