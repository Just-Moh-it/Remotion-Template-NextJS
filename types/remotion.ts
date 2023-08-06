import { z } from "zod";

export type InputProps = Record<string, unknown>;

export interface CompConfig<T extends z.ZodObject<any, any>> {
  id: string;
  durationInFrames: number;
  schema: T;
  component: React.FC;
  defaultProps: z.infer<T>;
}
export const createCompConfig = <T extends z.ZodObject<any, any>>(
  config: CompConfig<T>,
) => config;

export type DisplayableRenderProgressOrFinality =
  | {
      type: "progress";
      percent: number;
    }
  | {
      type: "success";
      url: string;
    }
  | {
      type: "error";
      // message: string; // Uncomment this if you want to display error messages on the client
    };
