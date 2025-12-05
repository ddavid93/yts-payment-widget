<template>
  <div class="w-full">
    <!-- Desktop Stepper - Header style from Figma -->
    <div class="hidden md:flex items-center justify-between border-b pb-8">
      <div
        v-for="(step, index) in steps"
        :key="step"
        class="flex items-center gap-3"
      >
        <div
          class="flex items-center justify-center rounded-full w-14 h-14"
          :class="[
            index === currentStep
              ? 'bg-primary text-primary-foreground'
              : 'bg-primary/30 text-primary-foreground',
          ]"
        >
          <component :is="getStepIcon(index)" class="w-8 h-8" />
        </div>
        <span
          class="text-base font-bold"
          :class="[
            index === currentStep
              ? 'text-muted-foreground'
              : 'text-muted-foreground/30',
          ]"
        >
          {{ $t(step) }}
        </span>
      </div>
    </div>

    <!-- Mobile Stepper (Accordion) -->
    <Accordion
      type="single"
      class="flex md:hidden flex-col gap-2 w-full"
      :modelValue="`item-${currentStep}`"
      collapsible
    >
      <AccordionItem
        v-for="(step, index) in steps"
        :key="step"
        :value="`item-${index}`"
        class="border rounded-lg"
        :class="[index === currentStep ? 'border-primary' : 'border-border']"
      >
        <AccordionTrigger
          class="px-4 py-3 hover:no-underline"
          :class="[
            index === currentStep ? 'text-primary' : 'text-muted-foreground',
          ]"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-200"
              :class="[
                index < currentStep
                  ? 'bg-primary border-primary text-primary-foreground'
                  : index === currentStep
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted bg-muted/20 text-muted-foreground',
              ]"
            >
              <component :is="getStepIcon(index)" class="w-5 h-5" />
            </div>
            <span class="font-medium">{{ $t(step) }}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent class="px-4 pb-4">
          <slot :name="`step-${index}`" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>

<script setup lang="ts">
import type { IStepperProps } from "@/types/form.type.ts";
import { User, List, CheckCircle2 } from "lucide-vue-next";
import type { Component } from "vue";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/composables/usei18n";

defineProps<IStepperProps>();

const { $t } = useI18n();

const getStepIcon = (index: number): Component => {
  switch (index) {
    case 0:
      return User;
    case 1:
      return List;
    case 2:
      return CheckCircle2;
    default:
      return User;
  }
};
</script>
