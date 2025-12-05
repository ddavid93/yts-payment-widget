<template>
  <div class="min-h-screen w-full bg-background">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- Stepper -->
      <div class="mb-8">
        <Stepper
          :steps="STEP_NAMES"
          :currentStep="currentStep"
          @navigate="onNavigate"
        >
          <!-- Mobile accordion content slots -->
          <template #step-0>
            <Transition name="fade-100" mode="out-in">
              <PersonalDataStep v-if="currentStep === 0" :key="0" />
            </Transition>
          </template>
          <template #step-1>
            <Transition name="fade-100" mode="out-in">
              <SummaryStep v-if="currentStep === 1" :key="1" />
            </Transition>
          </template>
          <template #step-2>
            <Transition name="fade-100" mode="out-in">
              <ConfirmationStep
                v-if="currentStep === 2"
                :key="2"
                @reset="resetStep"
              />
            </Transition>
          </template>
        </Stepper>
      </div>

      <!-- Form Content (Desktop only) -->
      <div v-if="isDesktop" class="bg-card rounded-lg p-6 md:p-8">
        <form @submit="onSubmit">
          <Transition name="fade-100" mode="out-in">
            <!-- Step 1: Personal Data -->
            <PersonalDataStep v-if="currentStep === 0" :key="0" />

            <!-- Step 2: Summary -->
            <SummaryStep v-else-if="currentStep === 1" :key="1" />

            <!-- Step 3: Confirmation -->
            <ConfirmationStep v-else :key="2" @reset="resetStep" />
          </Transition>

          <!-- Navigation Buttons -->
          <Transition name="fade-100" mode="out-in">
            <div
              v-if="currentStep < 2"
              :key="`nav-${currentStep}`"
              class="flex justify-between mt-8 pt-6 border-t"
            >
              <Button
                v-if="currentStep > 0"
                type="button"
                size="lg"
                variant="outline"
                @click="prevStep"
              >
                {{ $t("label.back") }}
              </Button>
              <div v-else />

              <Button
                v-if="currentStep === 0"
                :type="currentStep === 0 ? 'submit' : 'button'"
                size="lg"
                @click="currentStep === 1 && nextStep()"
              >
                {{ $t("label.next") }}
              </Button>
            </div>
          </Transition>
        </form>
      </div>

      <!-- Mobile Navigation Buttons -->
      <div
        v-if="isMobile && currentStep < 2"
        class="flex justify-between mt-4 border-t pt-4"
      >
        <Button
          v-if="currentStep > 0"
          type="button"
          size="lg"
          variant="outline"
          @click="prevStep"
        >
          {{ $t("label.back") }}
        </Button>
        <div v-else />
        <Button
          size="lg"
          type="button"
          @click="currentStep === 1 ? nextStep : onSubmit"
        >
          {{ $t("label.next") }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { STEP_NAMES } from "@/constants/form-options";
import Stepper from "@/components/Stepper.vue";
import PersonalDataStep from "@/components/steps/PersonalDataStep.vue";
import SummaryStep from "@/components/steps/SummaryStep.vue";
import ConfirmationStep from "@/components/steps/ConfirmationStep.vue";
import { Button } from "@/components/ui/button";
import { usePaymentStore } from "@/stores/usePaymentWidget.store.ts";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { useI18n } from "@/composables/usei18n";

const { currentStep, nextStep, prevStep, resetStep, onSubmit } =
  usePaymentStore();

const { $t } = useI18n();

// Detect device type using VueUse breakpoints (Tailwind preset)
const breakpoints = useBreakpoints(breakpointsTailwind);
const isDesktop = breakpoints.greaterOrEqual("md");
const isMobile = breakpoints.smaller("md");

// Handle stepper click navigation (adjacent only)
const onNavigate = (targetIndex: number): void => {
  if (targetIndex === currentStep.value + 1) {
    void nextStep();
    return;
  }
  if (targetIndex === currentStep.value - 1) {
    prevStep();
  }
};
</script>
