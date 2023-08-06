import { z } from "zod";

export const inputPropsSchema = z.intersection(
  z.object({
    width: z.number(),
    height: z.number(),
  }),
  z.record(z.string(), z.any()),
);
export type InputProps = z.infer<typeof inputPropsSchema>;

export interface CompConfig {
  id: string;
  durationInFrames: number;
  schema: z.ZodObject<any, any>;
  component: React.FC;
}

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
