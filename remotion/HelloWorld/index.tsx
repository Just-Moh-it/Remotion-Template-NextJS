import { remotionConfig } from "@/config/remotion";
import { CompConfig, inputPropsSchema } from "@/types/remotion";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { z } from "zod";

const id = "hello-world";
const durationInFrames = remotionConfig.fps * 10;

const schema = z.object({
  name: z.string().default("World"),
  showFrameCount: z.boolean().default(true),
});

type HelloWorldProps = z.infer<typeof inputPropsSchema>;

function HelloWorldComp({ name, showFrameCount }: HelloWorldProps) {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="bg-black items-center justify-center">
      <h1 className="text-white text-6xl font-bold">
        Hello {name} {showFrameCount && frame}
      </h1>
    </AbsoluteFill>
  );
}

export const helloWorldConfig = {
  id,
  durationInFrames,
  schema,
  component: HelloWorldComp as React.FC,
} satisfies CompConfig;
