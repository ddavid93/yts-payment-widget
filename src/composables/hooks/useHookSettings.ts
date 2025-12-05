import { merge } from "lodash-es";
import { nextTick, onBeforeMount, ref } from "vue";
import { useSettingsStore } from "@/stores/useSettings.store.ts";
import { useQuerySettings } from "@/composables/useQuerySettings.ts";
import type { ISettings } from "@/types/form.type.ts";

/**
 * Composable to trigger first in the app to initialize settings
 */
export function useHookSettings() {
  const isHookSettingsDone = ref(false);
  const isError = ref(false);

  const { settings } = useSettingsStore();
  const { fetchConfig } = useQuerySettings();

  onBeforeMount(async () => {
    try {
      const response = await fetchConfig();
      merge(settings.value, processFetchedConfig(response));
      await nextTick();
    } catch {
      isError.value = true;
    } finally {
      isHookSettingsDone.value = true;
    }
  });

  const processFetchedConfig = (data: any): Partial<ISettings> => {
    return {
      endpoint: data.api?.endpoint,
    };
  };

  return { isHookSettingsDone, isError };
}
