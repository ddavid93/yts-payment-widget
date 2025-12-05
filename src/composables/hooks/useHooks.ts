import { useHookSettings } from "@/composables/hooks/useHookSettings";
import { useHookStyles } from "@/composables/hooks/useHookStyles.ts";
import { nextTick, shallowRef } from "vue";
import { useTimeoutFn, watchOnce } from "@vueuse/core";
import { useInject } from "@/composables/useInject.ts";

/**
 * Composable to trigger first in the app to initialize settings
 */
export function useHooks() {
  const { isHookSettingsDone, isError } = useHookSettings();
  const isReady = shallowRef(false);

  const { widgetRef } = useInject();

  watchOnce(isHookSettingsDone, () => {
    const { start } = useTimeoutFn(async () => {
      useHookStyles(widgetRef!);
      await nextTick();
      isReady.value = true;
    }, 1000);
    start();
  });

  return { isReady, isError };
}
