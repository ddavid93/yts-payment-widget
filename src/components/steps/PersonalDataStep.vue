<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <h2 class="text-2xl font-semibold tracking-tight">
        Please enter your personal data
      </h2>
    </div>

    <!-- Name Fields -->
    <div class="grid gap-4 md:grid-cols-3">
      <SelectField
        name="salutation"
        label="Anrede"
        :options="SALUTATION_OPTIONS"
      />

      <FormField v-slot="{ componentField }" name="firstName">
        <FormItem>
          <FormLabel>Vorname*</FormLabel>
          <FormControl>
            <Input placeholder="Vorname" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="lastName">
        <FormItem>
          <FormLabel>Nachname*</FormLabel>
          <FormControl>
            <Input placeholder="Nachname" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <!-- Contact Fields -->
    <div class="grid gap-4 md:grid-cols-2">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>E-Mail Adresse*</FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder="email@adresse.com"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="phone">
        <FormItem>
          <FormLabel>Telefonnummer</FormLabel>
          <FormControl>
            <Input placeholder="IT" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <!-- Street Field -->
    <FormField v-slot="{ componentField }" name="street">
      <FormItem>
        <FormLabel>Straße</FormLabel>
        <FormControl>
          <Input placeholder="Straße" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Address Fields -->
    <div class="grid gap-4 md:grid-cols-3">
      <FormField v-slot="{ componentField }" name="zip">
        <FormItem>
          <FormLabel>PLZ</FormLabel>
          <FormControl>
            <Input placeholder="Postleitzahl" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="city">
        <FormItem>
          <FormLabel>Ort</FormLabel>
          <FormControl>
            <Input placeholder="Ort" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <SelectField
        name="country"
        label="Land"
        placeholder="Land auswählen"
        :options="COUNTRY_OPTIONS"
      />
    </div>

    <!-- Payment Fields -->
    <div class="grid gap-4 md:grid-cols-2">
      <SelectField
        name="paymentMethod"
        label="Payment Method"
        placeholder="Choose payment method"
        :options="PAYMENT_METHOD_OPTIONS"
      />

      <DatePickerField name="dueDate" label="Due date" />
    </div>

    <!-- Bank Information -->
    <div class="space-y-4">
      <p class="text-sm text-muted-foreground">
        {{ BANK_INFO.message }}
      </p>
      <div class="text-sm font-medium">
        <p>{{ BANK_INFO.bankName }}</p>
        <p>IBAN {{ BANK_INFO.iban }}</p>
        <p>SWIFT {{ BANK_INFO.swift }}</p>
      </div>
    </div>

    <!-- Terms Checkbox -->
    <FormField v-slot="{ value, handleChange }" name="terms">
      <FormItem class="flex flex-row items-start space-x-3 space-y-0">
        <FormControl>
          <Checkbox :checked="value" @update:modelValue="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>
            *I hereby accept the privacy policy and general terms and
            conditions.
          </FormLabel>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>
  </div>
</template>

<script setup lang="ts">
import {
  BANK_INFO,
  COUNTRY_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  SALUTATION_OPTIONS,
} from "@/constants/form-options";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import SelectField from "@/components/form/SelectField.vue";
import DatePickerField from "@/components/form/DatePickerField.vue";
</script>
