<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem>
      <FormLabel v-once>{{ label }}</FormLabel>
      <Select v-bind="componentField">
        <FormControl>
          <SelectTrigger>
            <SelectValue :placeholder="placeholder || '-'" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem
            v-for="option in options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  </FormField>
</template>

<script setup lang="ts">
import type { ISelectOption } from '@/types/form.type.ts'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ISelectFieldProps {
  name: string
  label: string
  placeholder?: string
  options: ISelectOption[]
}

defineProps<ISelectFieldProps>()
</script>
