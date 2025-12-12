import { ref } from "vue";
import { useInject } from "@/composables/useInject.ts";
import { createSharedComposable } from "@vueuse/core";
import type { ISettings } from "@/types/form.type.ts";

/**
 * This composable can be used only by useBookingStore
 */
function useSettingsStoreSingleton() {
  const { lang } = useInject();

  const settings = ref<ISettings>({ lang, id: "", endpoint: "", style: {} });

  return {
    settings,
  };
}

export const useSettingsStore = createSharedComposable(
  useSettingsStoreSingleton,
);
