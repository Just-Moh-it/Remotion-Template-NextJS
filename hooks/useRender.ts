"use client";

import { useState } from "react";
import { createRender, getProgress } from "@/app/(editor)/editor/_actions";
import { DisplayableRenderProgressOrFinality } from "@/types/remotion";

export type RenderStatus = "ready" | "provisioning" | "progress";

export const useRender = () => {
  const [status, setStatus] = useState<RenderStatus>("ready");
  const [renderProgressOrFinality, setRenderProgressOrFinality] =
    useState<DisplayableRenderProgressOrFinality>({
      type: "progress",
      percent: 0,
    });

  const start = async ({
    compId,
    inputProps,
  }: {
    inputProps: Record<string, unknown>;
    compId: string;
  }) => {
    setStatus("provisioning");

    try {
      const render = await createRender({ compId, inputProps });

      setStatus("progress");

      let progress: DisplayableRenderProgressOrFinality = {
        type: "progress",
        percent: 0,
      };

      while (progress.type === "progress") {
        progress = await getProgress(render);

        setRenderProgressOrFinality(progress);
      }
      setStatus("ready");

      if (progress.type === "error") {
        console.error(
          "⚠️ Error occurred while rendering. Please check server logs for more info"
        );
      }
    } catch (err) {
      setStatus("ready");
      console.error("⚠️ Error occurred while starting render:", err);
    }
  };

  return { start, status };
};
