import { injectLocal } from "@vueuse/core";
import type { LangType } from "@/types/form.type.ts";

export function useInject() {
  const uuid = injectLocal<string>("uuid");
  const lang = injectLocal<LangType>("lang") || "en";

  return { uuid, lang };
}
