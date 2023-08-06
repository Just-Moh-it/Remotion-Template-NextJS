import { helloWorldConfig } from "./HelloWorld";
import { Composition, getInputProps } from "remotion";
import { remotionConfig } from "@/config/remotion";
import { CompConfig, inputPropsSchema } from "@/types/remotion";

export const comps = new Map([
  [helloWorldConfig.id, helloWorldConfig],
]) satisfies Map<string, CompConfig>;

const inputProps = typeof window === "undefined"
  ? inputPropsSchema.parse(getInputProps())
  : null;

export default function Root() {
  return (
    <>
      {Array.from(comps.values()).map((comp) => (
        <Composition
          key={comp.id}
          id={comp.id}
          component={comp.component as React.FC}
          durationInFrames={comp.durationInFrames}
          fps={remotionConfig.fps}
          height={inputProps?.height ?? remotionConfig.fallbackHeight}
          width={inputProps?.width ?? remotionConfig.fallbackWidth}
        />
      ))}
    </>
  );
}
