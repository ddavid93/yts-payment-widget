import { ref, shallowRef } from "vue";
import { createGlobalState } from "@vueuse/core";
import type { IFormData } from "@/types/form.type.ts";
import { STEP_NAMES } from "@/constants/form-options.ts";
import { usePaymentFormStore } from "@/stores/usePaymentForm.store.ts";

function usePaymentStoreSingleton() {
  const { form } = usePaymentFormStore();

  const widgetRefForStyle = shallowRef<HTMLElement>();

  // Current step state
  const currentStep = ref<number>(0);

  /**
   * Navigate to the next step
   * Validates form on step 0 before proceeding
   */
  const nextStep = async (): Promise<void> => {
    if (currentStep.value === 0) {
      const result = await form.validate();
      if (!result.valid) {
        return;
      }
    }

    if (currentStep.value < STEP_NAMES.length - 1) {
      currentStep.value++;
    }
  };

  /**
   * Navigate to the previous step
   */
  const prevStep = (): void => {
    if (currentStep.value > 0) {
      currentStep.value--;
    }
  };

  /**
   * Reset form to initial state
   */
  const resetStep = (): void => {
    currentStep.value = 0;
    form.resetForm();
  };

  /**
   * Handle form submission
   */
  const onSubmit = form.handleSubmit((values: IFormData) => {
    console.log("Form submitted:", values);
    void nextStep();
  });

  return {
    currentStep,
    nextStep,
    onSubmit,
    prevStep,
    resetStep,
    widgetRefForStyle,
  };
}

export const usePaymentStore = createGlobalState(usePaymentStoreSingleton);
