import { ref } from "vue";
import { useInjectsStore } from "@/stores/useInjects.store";
import { createSharedComposable } from "@vueuse/core";

/**
 * This composable can be used only by useBookingStore
 */
function useSettingsStoreSingleton() {
  const { lang } = useInjectsStore();

  const settings = ref({ lang });

  return {
    settings,
  };
}

export const useSettingsStore = createSharedComposable(
  useSettingsStoreSingleton,
);
