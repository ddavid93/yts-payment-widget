<template>
  <div class="w-full">
    <!-- Desktop Stepper -->
    <div class="hidden md:flex items-center justify-between relative">
      <!-- Progress Bar Background -->
      <div class="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-muted -z-10" />
      
      <div 
        v-for="(step, index) in steps" 
        :key="step"
        class="flex flex-col items-center gap-2 bg-background px-4"
      >
        <div 
          class="flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors duration-200"
          :class="[
            index < currentStep 
              ? 'bg-primary border-primary text-primary-foreground' 
              : index === currentStep
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-muted bg-muted/20 text-muted-foreground'
          ]"
        >
          <component :is="getStepIcon(index)" class="w-5 h-5" />
        </div>
        <span 
          class="text-sm font-medium transition-colors duration-200"
          :class="[
            index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
          ]"
        >
          {{ step }}
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
        :class="[
          index === currentStep ? 'border-primary' : 'border-border'
        ]"
      >
        <AccordionTrigger 
          class="px-4 py-3 hover:no-underline"
          :class="[
            index === currentStep ? 'text-primary' : 'text-muted-foreground'
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
                    : 'border-muted bg-muted/20 text-muted-foreground'
              ]"
            >
              <component :is="getStepIcon(index)" class="w-5 h-5" />
            </div>
            <span class="font-medium">{{ step }}</span>
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
import type { IStepperProps } from '@/types/form'
import { User, List, CheckCircle2 } from 'lucide-vue-next'
import type { Component } from 'vue'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

defineProps<IStepperProps>()

const getStepIcon = (index: number): Component => {
  switch (index) {
    case 0:
      return User
    case 1:
      return List
    case 2:
      return CheckCircle2
    default:
      return User
  }
}
</script>
