import { useHookSettings } from "@/composables/hooks/useHookSettings";
import { useHookStyles } from "@/composables/hooks/useHookStyles.ts";
import { nextTick, type ShallowRef, shallowRef } from "vue";
import { useTimeoutFn, watchOnce } from "@vueuse/core";

/**
 * Composable to trigger first in the app to initialize settings
 */
export function useHooks(
  widgetRefForStyle: Readonly<ShallowRef<HTMLDivElement | null>>,
) {
  const { isHookSettingsDone } = useHookSettings();
  const isReady = shallowRef(false);

  watchOnce(isHookSettingsDone, () => {
    const { start } = useTimeoutFn(async () => {
      useHookStyles(widgetRefForStyle);
      await nextTick();
      isReady.value = true;
    }, 1000);
    start();
  });

  return { isReady };
}
