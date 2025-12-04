import { merge } from "lodash-es";
import { nextTick, onBeforeMount, ref } from "vue";
import { useSettingsStore } from "@/stores/useSettings.store.ts";
import { useQuerySettings } from "@/composables/useQuerySettings.ts";
import { processFetchedConfig } from "@/utils/process.util.ts";

/**
 * Composable to trigger first in the app to initialize settings
 */
export function useHookSettings() {
  const isHookSettingsDone = ref(false);

  const { settings } = useSettingsStore();
  const { fetchConfig } = useQuerySettings();

  onBeforeMount(async () => {
    const response = await fetchConfig();
    merge(settings.value, processFetchedConfig(response));
    await nextTick();
    isHookSettingsDone.value = true;
  });

  return { isHookSettingsDone };
}
