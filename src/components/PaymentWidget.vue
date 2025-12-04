<template>
  <div class="min-h-screen w-full bg-background">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- Stepper -->
      <div class="mb-8">
        <Stepper :steps="STEP_NAMES" :currentStep="currentStep">
          <!-- Mobile accordion content slots -->
          <template #step-0>
            <PersonalDataStep v-if="currentStep === 0" />
          </template>
          <template #step-1>
            <SummaryStep v-if="currentStep === 1" />
          </template>
          <template #step-2>
            <ConfirmationStep v-if="currentStep === 2" @reset="resetForm" />
          </template>
        </Stepper>
      </div>

      <!-- Form Content (Desktop only) -->
      <div class="hidden md:block bg-card rounded-lg border p-6 md:p-8">
        <form @submit="onSubmit">
          <!-- Step 1: Personal Data -->
          <PersonalDataStep v-if="currentStep === 0" />

          <!-- Step 2: Summary -->
          <SummaryStep v-if="currentStep === 1" />

          <!-- Step 3: Confirmation -->
          <ConfirmationStep v-if="currentStep === 2" @reset="resetForm" />

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
              Back
            </Button>
            <div v-else />

            <Button v-if="currentStep === 0" type="submit"> Next </Button>
            <Button
              v-else-if="currentStep === 1"
              type="button"
              @click="nextStep"
            >
              Next
            </Button>
          </div>
        </form>
      </div>

      <!-- Mobile Navigation Buttons -->
      <div v-if="currentStep < 2" class="flex md:hidden justify-between mt-4">
        <Button
          v-if="currentStep > 0"
          type="button"
          variant="outline"
          @click="prevStep"
        >
          Back
        </Button>
        <div v-else />

        <Button v-if="currentStep === 0" type="button" @click="onSubmit">
          Next
        </Button>
        <Button v-else-if="currentStep === 1" type="button" @click="nextStep">
          Next
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

const { currentStep, nextStep, prevStep, resetForm, onSubmit } =
  usePaymentStore();
</script>
