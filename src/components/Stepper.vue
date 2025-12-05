<template>
  <div class="w-full">
    <!-- Desktop Stepper - Header style from Figma -->
    <Transition name="fade-100" mode="out-in" appear>
      <div v-if="isDesktop" key="desktop" class="flex items-center justify-between border-b pb-8">
        <div
          v-for="(step, index) in steps"
          :key="step"
          class="flex items-center gap-3 cursor-pointer select-none"
          role="button"
          tabindex="0"
          :aria-current="index === currentStep ? 'step' : undefined"
          @click="onStepClick(index)"
          @keydown.enter.prevent="onStepClick(index)"
          @keydown.space.prevent="onStepClick(index)"
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
    </Transition>

    <!-- Mobile Stepper (Accordion) -->
    <Transition name="fade-100" mode="out-in" appear>
      <Accordion
        v-if="isMobile"
        key="mobile"
        type="single"
        class="flex flex-col gap-2 w-full"
        :modelValue="`item-${currentStep}`"
        collapsible
      >
        <AccordionItem
          v-for="(step, index) in steps"
          :key="step"
          :value="`item-${index}`"
          class="border rounded-lg border-border"
        >
          <AccordionTrigger
            class="px-4 py-3 hover:no-underline"
            :class="[
              index === currentStep
                ? 'text-muted-foreground'
                : 'text-muted-foreground/30',
            ]"
          >
          <div class="flex items-center gap-3">
              <div
                class="flex items-center justify-center rounded-full w-12 h-12"
                :class="[
                  index === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-primary/30 text-primary-foreground',
                ]"
              >
                <component :is="getStepIcon(index)" class="w-6 h-6" />
              </div>
              <span
                class="text-sm font-bold"
                :class="[
                  index === currentStep
                    ? 'text-muted-foreground'
                    : 'text-muted-foreground/30',
                ]"
              >
                {{ $t(step) }}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent class="px-4 pb-4">
            <slot :name="`step-${index}`" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Transition>
    </div>
  </template>

  <script setup lang="ts">
  import type { IStepperProps } from "@/types/form.type.ts";
  import { UserPen, ListChecks, CheckCircle2 } from "lucide-vue-next";
  import type { Component } from "vue";
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { useI18n } from "@/composables/usei18n";
  import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

  const props = defineProps<IStepperProps>();
  const emit = defineEmits<{
    (e: "navigate", index: number): void;
  }>();

  const { $t } = useI18n();

  // Responsive rendering to allow appear/disappear transitions
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const isDesktop = breakpoints.greaterOrEqual("md");
  const isMobile = breakpoints.smaller("md");

const getStepIcon = (index: number): Component => {
  switch (index) {
    case 0:
      return UserPen;
    case 1:
      return ListChecks;
    case 2:
      return CheckCircle2;
    default:
      return UserPen;
  }
};

const onStepClick = (index: number): void => {
  // Allow only adjacent navigation (previous/next) as requested
  if (index === props.currentStep) return;
  if (index === props.currentStep + 1 || index === props.currentStep - 1) {
    emit("navigate", index);
  }
};
</script>
