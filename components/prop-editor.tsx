import { CompConfig, InputProps } from "@/types/remotion";
import { Dispatch, Fragment, SetStateAction, useMemo } from "react";
import { ZodObject } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { JsonSchema7ObjectType } from "zod-to-json-schema/src/parsers/object";

export default function PropEditor({
  inputProps,
  schema,
  setInputProps,
}: {
  inputProps: InputProps;
  setInputProps: Dispatch<SetStateAction<InputProps>>;
  schema: CompConfig<ZodObject<any, any>>["schema"];
}) {
  const inputPropsJson = zodToJsonSchema(schema);

  const properties = useMemo(
    () => (inputPropsJson as JsonSchema7ObjectType).properties ?? {},
    [inputPropsJson],
  );

  return (
    <>
      {Object.entries(properties).map(([key, config]) => {
        return (
          <Fragment key={key}>
            <label htmlFor={key}>{key}</label>
            {"type" in config &&
              (config.type === "string"
                ? (
                  <input
                    type="text"
                    value={inputProps[key] as string}
                    onChange={({ target: { value } }) =>
                      setInputProps((prev) => ({ ...prev, [key]: value }))}
                    id={key}
                  />
                )
                : config.type === "boolean"
                ? (
                  <input
                    type="checkbox"
                    checked={(inputProps[key] as boolean) ?? false}
                    onChange={({ target: { checked } }) =>
                      setInputProps((prev) => ({ ...prev, [key]: checked }))}
                    id={key}
                  />
                )
                : <p>Input prop type not supported</p>)}
          </Fragment>
        );
      })}
    </>
  );
}
