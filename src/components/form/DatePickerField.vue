<template>
  <FormField v-slot="{ value, handleChange }" :name="name">
    <FormItem class="flex flex-col">
      <FormLabel v-once>{{ label }}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              type="button"
              variant="outline"
              :class="
                cn(
                  'w-full h-12 pl-3 text-left font-normal',
                  !value && 'text-muted-foreground',
                )
              "
            >
              <span>{{
                value ? formatDateShort(value) : placeholder || "TT.MM.JJJJ"
              }}</span>
              <CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0" align="start">
          <Calendar
            mode="single"
            :modelValue="value"
            initialFocus
            @update:modelValue="(val) => handleDateChange(val, handleChange)"
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  </FormField>
</template>

<script setup lang="ts">
import { formatDateShort } from "@/utils/formatters";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";

interface IDatePickerFieldProps {
  name: string;
  label: string;
  placeholder?: string;
}

defineProps<IDatePickerFieldProps>();

/**
 * Convert calendar value to proper Date object
 */
const handleDateChange = (
  value: unknown,
  handleChange: (value: Date | undefined) => void,
): void => {
  if (!value) {
    handleChange(undefined);
    return;
  }

  // If it's already a Date, use it
  if (value instanceof Date) {
    handleChange(value);
    return;
  }

  // If it's an object with a date property (from some calendar libraries)
  if (typeof value === "object" && value !== null && "toDate" in value) {
    handleChange((value as { toDate: () => Date }).toDate());
    return;
  }

  // Try to convert to Date
  const date = new Date(value as string);
  if (!isNaN(date.getTime())) {
    handleChange(date);
  }
};
</script>
