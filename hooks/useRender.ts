"use client";

import { useState } from "react";
import { createRender, getProgress } from "@/app/(editor)/editor/_actions";
import {
  InputProps,
} from "@/types/remotion";
import { remotionConfig } from "@/config/remotion";

export type RenderStatus = "ready" | "provisioning" | "progress";

export const useRender = ({
  onSuccess,
}: {
  onSuccess?: (url: string) => void;
}) => {
  const [status, setStatus] = useState<RenderStatus>("ready");
  const [progressPercent, setProgressPercent] = useState<number | null>(null);

  const start = async ({
    compId,
    inputProps,
  }: {
    inputProps: InputProps;
    compId: string;
  }) => {
    setStatus("provisioning");

    try {
      const render = await createRender({ compId, inputProps });

      setStatus("progress");
      setProgressPercent(0);

      const pollProgress = async (req: Parameters<typeof getProgress>[0]) => {
        const res = await getProgress(req);

        switch (res.type) {
          case "progress":
            setTimeout(
              () => pollProgress(req),
              remotionConfig.progressPollingMinWaitTimeInMs,
            );
            setProgressPercent(res.percent);
            break;

          case "success":
            console.log("Success", res);
            onSuccess?.(res.url);
            setProgressPercent(null);
            setStatus("ready");

          case "error":
            console.error(
              "⚠️ Error occurred while rendering. Please check server logs for more info",
            );
            setProgressPercent(null);
            setStatus("ready");
        }
      };

      pollProgress(render);
    } catch (err) {
      setStatus("ready");
      setProgressPercent(null);
      console.error("⚠️ Error occurred while starting render:", err);
    }
  };

  return { start, status, progressPercent };
};
