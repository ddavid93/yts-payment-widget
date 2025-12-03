import { useHookSettings } from "@/stores/settings/hooks/useHookSettings";
import { useHookStyles } from "@/stores/settings/hooks/useHookStyles";
import { useHookUtm } from "@/stores/settings/hooks/useHookUtm";
import { computed, nextTick, shallowRef } from "vue";
import { useTimeoutFn, watchOnce } from "@vueuse/core";

/**
 * Composable to trigger first in the app to initialize settings
 */
export function useHooks() {
  const { isHookSettingsDone } = useHookSettings();
  const { isHookUtmDone } = useHookUtm();
  const isReady = shallowRef(false);

  const internalReady = computed(
    () => isHookSettingsDone.value && isHookUtmDone.value
  );

  watchOnce(internalReady, () => {
    const { start } = useTimeoutFn(async () => {
      useHookStyles();
      await nextTick();
      isReady.value = true;
    }, 1000);
    start();
  });

  return { isReady };
}
