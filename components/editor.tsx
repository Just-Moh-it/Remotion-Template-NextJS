"use client";

import { Player } from "@remotion/player";
import { useCallback, useMemo, useState } from "react";
import { playerSizes, remotionConfig } from "@/config/remotion";
import { comps } from "@/remotion/Root";
import { helloWorldConfig } from "@/remotion/HelloWorld";
import PropEditor from "./prop-editor";
import { CompConfig } from "@/types/remotion";
import { JsonSchema7ObjectType } from "zod-to-json-schema/src/parsers/object";
import zodToJsonSchema from "zod-to-json-schema";
import { useRender } from "@/hooks/useRender";

export default function Editor() {
  const [playerSizeName, setPlayerSizeName] = useState<string>("16:9");
  const [currentCompId, setCurrentCompId] = useState<string>("hello-world");
  const [inputProps, setInputProps] = useState<Record<string, unknown>>(
    Object.entries(
      (
        zodToJsonSchema(
          (helloWorldConfig as CompConfig<{}>).inputPropsSchema,
        ) as JsonSchema7ObjectType
      ).properties,
    ).reduce((acc, [key, config]) => {
      return { ...acc, [key]: config.default };
    }, {}),
  );
  const { start: startRender, status: renderStatus } = useRender();
  //
  const currentComp = useMemo(() => {
    return comps.get(currentCompId) ?? helloWorldConfig;
  }, [currentCompId]);
  const playerSize = useMemo(() => {
    return playerSizes.get(playerSizeName) ?? { width: 1920, height: 1080 };
  }, [playerSizeName]);
  //
  const handleCompChange = useCallback((newCompId: string) => {
    setCurrentCompId(newCompId);
    //
    const newComp = comps.get(newCompId) ?? helloWorldConfig;
    //
    const properties = (
      zodToJsonSchema(newComp.inputPropsSchema) as JsonSchema7ObjectType
    )?.properties;
    //
    setInputProps({});
    //
    console.log(
      "🚀 ~ file: editor.tsx:44 ~ handleCompChange ~ properties:",
      properties,
      Object.entries(properties)[0],
    );
    //
    Object.entries(properties).forEach(([key, propConfig]) =>
      setInputProps((prev) => ({ ...prev, [key]: propConfig.default }))
    );
  }, []);
  //
  return (
    <div className="flex flex-col gap-2 items-stretch w-full">
      Editor comes here!
      <select
        value={playerSizeName}
        onChange={(e) => setPlayerSizeName(e.target.value)}
      >
        {Array.from(playerSizes.keys()).map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <select
        value={currentCompId}
        onChange={({ target: { value } }) => handleCompChange(value)}
      >
        {Array.from(comps.keys()).map((comp) => (
          <option key={comp} value={comp}>
            {comp}
          </option>
        ))}
      </select>
      <PropEditor
        inputProps={inputProps}
        setInputProps={setInputProps}
        schema={currentComp.inputPropsSchema}
      />
      <div className="flex w-full h-full grow">
        <Player
          controls
          clickToPlay
          inputProps={inputProps}
          component={currentComp.component as any}
          compositionHeight={playerSize.height}
          compositionWidth={playerSize.width}
          fps={remotionConfig.fps}
          durationInFrames={currentComp?.durationInFrames ?? 100}
          style={{ width: "100%", height: "100%", minHeight: 500 }}
        />
      </div>
      <button
        disabled={renderStatus !== "ready"}
        onClick={() => startRender({ inputProps, compId: currentCompId })}
      >
        Render: {renderStatus}
      </button>
    </div>
  );
}
