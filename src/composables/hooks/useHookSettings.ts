import { useFetchConfigQuery } from "@/stores/settings/useFetchConfigQuery.store";
import { storeToRefs } from "pinia";
import { useStepperStore } from "@/stores/useStepper.store";
import { processFetchedConfig } from "@/stores/settings/process.util";
import { merge } from "lodash-es";
import { nextTick, ref, watch } from "vue";
import { useSettingsStore } from "@/stores/settings/useSettings.store";

/**
 * Composable to trigger first in the app to initialize settings
 */
export function useHookSettings() {
  const isHookSettingsDone = ref(false);
  const stepperStore = useStepperStore();
  const { gridStyle } = storeToRefs(stepperStore);

  function stepperHook(style: any) {
    gridStyle.value = style.grid_style || "stepper";
  }

  const { settings } = useSettingsStore();
  const { data } = useFetchConfigQuery();

  watch(
    data,
    async (val) => {
      if (!val) return;
      merge(settings.value, processFetchedConfig(val));
      stepperHook(val.style);
      await nextTick();
      isHookSettingsDone.value = true;
    },
    { immediate: true }
  );

  return { isHookSettingsDone };
}
