import { injectLocal } from "@vueuse/core";
import type { LangType } from "@/types/form.type.ts";
import {
  LangSymbolKey,
  RefWidgetKey,
  UuidSymbolKey,
} from "@/constants/symbols.ts";
import type { ShallowRef } from "vue";

export function useInject() {
  const uuid = injectLocal<string>(UuidSymbolKey);
  const lang = injectLocal<LangType>(LangSymbolKey);
  const widgetRef =
    injectLocal<Readonly<ShallowRef<HTMLDivElement | null>>>(RefWidgetKey);

  return { uuid, lang, widgetRef };
}
