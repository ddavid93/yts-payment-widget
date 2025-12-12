<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <h2 class="text-3xl font-semibold tracking-tight">
        {{ $t("form.personal_data.title") }}
      </h2>
    </div>

    <!-- Name Fields -->
    <div class="grid gap-4 md:grid-cols-3">
      <SelectField
        name="salutation"
        :label="$t('form.salutation.label')"
        :options="SALUTATION_OPTIONS"
      />

      <FormField v-slot="{ componentField }" name="firstName">
        <FormItem>
          <FormLabel>{{ $t("form.first_name.label") }}</FormLabel>
          <FormControl>
            <Input
              :placeholder="$t('form.first_name.placeholder')"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="lastName">
        <FormItem>
          <FormLabel>{{ $t("form.last_name.label") }}</FormLabel>
          <FormControl>
            <Input
              :placeholder="$t('form.last_name.placeholder')"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <!-- Contact Fields -->
    <div class="grid gap-4 md:grid-cols-2">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>{{ $t("form.email.label") }}</FormLabel>
          <FormControl>
            <Input
              type="email"
              :placeholder="$t('form.email.placeholder')"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="phone">
        <FormItem>
          <FormLabel>{{ $t("form.phone.label") }}</FormLabel>
          <FormControl>
            <Input
              :placeholder="$t('form.phone.placeholder')"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <!-- Street Field -->
    <FormField v-slot="{ componentField }" name="street">
      <FormItem>
        <FormLabel>{{ $t("form.street.label") }}</FormLabel>
        <FormControl>
          <Input
            :placeholder="$t('form.street.placeholder')"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Address Fields -->
    <div class="grid gap-4 md:grid-cols-3">
      <FormField v-slot="{ componentField }" name="zip">
        <FormItem>
          <FormLabel>{{ $t("form.zip.label") }}</FormLabel>
          <FormControl>
            <Input
              :placeholder="$t('form.zip.placeholder')"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="city">
        <FormItem>
          <FormLabel>{{ $t("form.city.label") }}</FormLabel>
          <FormControl>
            <Input
              :placeholder="$t('form.city.placeholder')"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <SelectField
        name="country"
        :label="$t('form.country.label')"
        :placeholder="$t('form.country.placeholder')"
        :options="COUNTRY_OPTIONS"
      />
    </div>

    <!-- Payment Fields -->
    <div class="grid gap-4 md:grid-cols-2">
      <SelectField
        name="paymentMethod"
        :label="$t('form.payment_method.label')"
        :placeholder="$t('form.payment_method.placeholder')"
        :options="PAYMENT_METHOD_OPTIONS"
      />

      <DatePickerField name="dueDate" :label="$t('form.due_date.label')" />
    </div>

    <!-- Bank Information -->
    <div class="space-y-4">
      <p class="text-sm text-muted-foreground">
        {{ $t("bank_info.message") }}
      </p>
      <div class="text-sm font-medium">
        <p>{{ $t("bank_info.bank_name") }}</p>
        <p>{{ $t("bank_info.iban") }} {{ BANK_INFO.iban }}</p>
        <p>{{ $t("bank_info.swift") }} {{ BANK_INFO.swift }}</p>
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
            {{ $t("form.terms.acceptance") }}
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
import { useI18n } from "@/composables/i18n";

const { $t } = useI18n();
</script>
