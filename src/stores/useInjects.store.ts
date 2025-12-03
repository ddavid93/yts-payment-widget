import { createSharedComposable, injectLocal } from "@vueuse/core";
import type { LangType } from "@/types/form.type.ts";

function useInjectsStoreSingleton() {
  const uuid = injectLocal<string>("uuid");
  const lang = injectLocal<LangType>("lang") || "en";

  return { uuid, lang };
}

export const useInjectsStore = createSharedComposable(useInjectsStoreSingleton);
