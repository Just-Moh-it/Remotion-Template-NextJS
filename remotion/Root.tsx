import { helloWorldConfig } from "./HelloWorld";
import { Composition } from "remotion";
import { remotionConfig } from "@/config/remotion";
import { CompConfig } from "@/types/remotion";

export const comps = new Map([
  [helloWorldConfig.id, helloWorldConfig],
]) satisfies Map<string, CompConfig<any>>;

export default function Root() {
  return (
    <>
      {Array.from(comps.values()).map((comp) => (
        <Composition
          key={comp.id}
          id={comp.id}
          component={comp.component}
          durationInFrames={comp.durationInFrames}
          fps={remotionConfig.fps}
          height={remotionConfig.height}
          width={remotionConfig.width}
        ></Composition>
      ))}
    </>
  );
}
