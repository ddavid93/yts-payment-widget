<template>
  <div class="min-h-screen w-full bg-background">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- Stepper -->
      <div class="mb-8">
        <Stepper :steps="STEP_NAMES" :currentStep="currentStep">
          <!-- Mobile accordion content slots -->
          <template #step-0>
            <Transition
              mode="out-in"
              enterActiveClass="transition-opacity duration-200 ease-out"
              enterFromClass="opacity-0"
              enterToClass="opacity-100"
              leaveActiveClass="transition-opacity duration-200 ease-in"
              leaveFromClass="opacity-100"
              leaveToClass="opacity-0"
            >
              <PersonalDataStep v-if="currentStep === 0" :key="0" />
            </Transition>
          </template>
          <template #step-1>
            <Transition
              mode="out-in"
              enterActiveClass="transition-opacity duration-200 ease-out"
              enterFromClass="opacity-0"
              enterToClass="opacity-100"
              leaveActiveClass="transition-opacity duration-200 ease-in"
              leaveFromClass="opacity-100"
              leaveToClass="opacity-0"
            >
              <SummaryStep v-if="currentStep === 1" :key="1" />
            </Transition>
          </template>
          <template #step-2>
            <Transition
              mode="out-in"
              enterActiveClass="transition-opacity duration-200 ease-out"
              enterFromClass="opacity-0"
              enterToClass="opacity-100"
              leaveActiveClass="transition-opacity duration-200 ease-in"
              leaveFromClass="opacity-100"
              leaveToClass="opacity-0"
            >
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
      <div v-if="isDesktop" class="bg-card rounded-lg border p-6 md:p-8">
        <form @submit="onSubmit">
          <Transition
            mode="out-in"
            enterActiveClass="transition-opacity duration-200 ease-out"
            enterFromClass="opacity-0"
            enterToClass="opacity-100"
            leaveActiveClass="transition-opacity duration-200 ease-in"
            leaveFromClass="opacity-100"
            leaveToClass="opacity-0"
          >
            <!-- Step 1: Personal Data -->
            <PersonalDataStep v-if="currentStep === 0" :key="0" />

            <!-- Step 2: Summary -->
            <SummaryStep v-else-if="currentStep === 1" :key="1" />

            <!-- Step 3: Confirmation -->
            <ConfirmationStep v-else :key="2" @reset="resetStep" />
          </Transition>

          <!-- Navigation Buttons -->
          <div
            v-if="currentStep < 2"
            class="flex justify-between mt-8 pt-6 border-t"
          >
            <Button
              v-if="currentStep > 0"
              type="button"
              variant="outline"
              @click="prevStep"
            >
              {{ $t("label.back") }}
            </Button>
            <div v-else />

            <Button v-if="currentStep === 0" type="submit">
              {{ $t("label.next") }}
            </Button>
            <Button
              v-else-if="currentStep === 1"
              type="button"
              @click="nextStep"
            >
              {{ $t("label.next") }}
            </Button>
          </div>
        </form>
      </div>

      <!-- Mobile Navigation Buttons -->
      <div v-if="isMobile && currentStep < 2" class="flex justify-between mt-4">
        <Button
          v-if="currentStep > 0"
          type="button"
          variant="outline"
          @click="prevStep"
        >
          {{ $t("label.back") }}
        </Button>
        <div v-else />

        <Button v-if="currentStep === 0" type="button" @click="onSubmit">
          {{ $t("label.next") }}
        </Button>
        <Button v-else-if="currentStep === 1" type="button" @click="nextStep">
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
</script>
