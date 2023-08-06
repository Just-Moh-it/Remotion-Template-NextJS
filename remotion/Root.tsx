import { helloWorldConfig } from "./HelloWorld";
import { Composition, getInputProps } from "remotion";
import { remotionConfig } from "@/config/remotion";
import { CompConfig } from "@/types/remotion";
import { z } from "zod";

export const comps = new Map([
  [helloWorldConfig.id, helloWorldConfig],
]) satisfies Map<string, CompConfig<z.ZodObject<any, any>>>;

const inputProps = typeof window === "undefined"
  ? z.object({
    width: z.number(),
    height: z.number(),
  }).nonstrict().parse(getInputProps())
  : null;

export default function Root() {
  return (
    <>
      {Array.from(comps.values()).map((comp) => (
        <Composition
          key={comp.id}
          id={comp.id}
          schema={comp.schema}
          defaultProps={comp.defaultProps}
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
