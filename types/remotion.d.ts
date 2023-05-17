export interface CompConfig<T> {
  id: string;
  durationInFrames: number;
  inputPropsSchema: z.ZodType<T>;
  component: HelloWorldComp;
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
