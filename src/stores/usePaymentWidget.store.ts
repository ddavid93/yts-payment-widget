import { onBeforeMount, shallowRef } from "vue";
import { createSharedComposable } from "@vueuse/core";
import { useQuerySettings } from "@/composables/useQuerySettings.ts";

function usePaymentStoreSingleton() {
  const { fetchConfig } = useQuerySettings();



  const dataStyle = computed(() => data.value?.style);


  const widgetRefForStyle = shallowRef<HTMLElement>();

  onBeforeMount(async () => {
    const response = await fetchConfig();

  })

  return {
    widgetRefForStyle,
  };
}

export const usePaymentStore = createSharedComposable(usePaymentStoreSingleton);
