import type { ISettings } from "@/types/form.type.ts";

export const processFetchedConfig = (data: any): Partial<ISettings> => {
  return {
    endpoint: data.api?.endpoint,
  };
};
