import { InputProps } from "@/types/remotion";
import React, { Dispatch, SetStateAction } from "react";
import { z, ZodObject } from "zod";

const PropEditor = ({ schema, setInputProps, inputProps }: {
  schema: ZodObject<any, any>;
  setInputProps: Dispatch<SetStateAction<InputProps>>;
  inputProps: InputProps;
}) => {
  const shape = schema._def.shape();
  const keys = Object.keys(shape);

  return (
    <>
      {keys.map((key) => {
        const getControl = () => {
          switch (shape[key].constructor) {
            case z.ZodString:
              return (
                <input
                  id={key}
                  key={key}
                  type="text"
                  name={key}
                  value={inputProps[key] as string}
                  onChange={({ target: { value } }) =>
                    setInputProps((state) => ({ ...state, [key]: value }))}
                />
              );
            case z.ZodNumber:
              return (
                <input
                  id={key}
                  key={key}
                  type="number"
                  name={key}
                  value={inputProps[key] as string}
                  onChange={({ target: { value } }) =>
                    setInputProps((state) => ({
                      ...state,
                      [key]: parseInt(value),
                    }))}
                />
              );
            case z.ZodBoolean:
              return (
                <input
                  id={key}
                  type="checkbox"
                  key={key}
                  name={key}
                  checked={inputProps[key] as boolean}
                  onChange={({ target: { checked } }) =>
                    setInputProps((state) => ({
                      ...state,
                      [key]: checked,
                    }))}
                />
              );
            default:
              return null;
          }
        };

        return (
          <div className="flex flex-col items-stretch" key={key}>
            <label htmlFor={key}>{key}</label>
            {getControl()}
          </div>
        );
      })}
    </>
  );
};

export default PropEditor;
