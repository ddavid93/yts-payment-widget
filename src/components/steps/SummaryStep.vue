<template>
  <div class="space-y-6">
    <div
      v-if="
        form.values.salutation || form.values.firstName || form.values.lastName
      "
      class="space-y-2"
    >
      <h3 v-once class="text-sm font-medium text-muted-foreground">
        {{ $t('summary.salutation_and_name') }}
      </h3>
      <p class="text-base font-semibold">
        {{ form.values.salutation }} {{ form.values.firstName }}
        {{ form.values.lastName }}
      </p>
    </div>

    <div v-if="form.values.email" class="space-y-2">
      <h3 v-once class="text-sm font-medium text-muted-foreground">{{ $t('summary.email') }}</h3>
      <p class="text-base font-semibold">{{ form.values.email }}</p>
    </div>

    <div v-if="form.values.phone" class="space-y-2">
      <h3 v-once class="text-sm font-medium text-muted-foreground">{{ $t('summary.phone') }}</h3>
      <p class="text-base font-semibold">{{ form.values.phone }}</p>
    </div>

    <div
      v-if="
        form.values.street ||
        form.values.zip ||
        form.values.city ||
        form.values.country
      "
      class="space-y-2"
    >
      <h3 v-once class="text-sm font-medium text-muted-foreground">{{ $t('summary.address') }}</h3>
      <div class="text-base font-semibold">
        <p v-if="form.values.street">{{ form.values.street }}</p>
        <p v-if="form.values.zip || form.values.city">
          {{ form.values.zip }}{{ form.values.zip && form.values.city ? ", " : "" }}{{ form.values.city }}
        </p>
        <p v-if="form.values.country">{{ form.values.country }}</p>
      </div>
    </div>

    <div v-if="form.values.paymentMethod" class="space-y-2">
      <h3 v-once class="text-sm font-medium text-muted-foreground">
        {{ $t('summary.payment_method') }}
      </h3>
      <p class="text-base font-semibold">
        {{ $t(`payment_method.${form.values.paymentMethod}`) }}
      </p>
      <div v-once class="text-sm text-muted-foreground mt-2">
        <p>{{ $t('bank_info.message') }}</p>
        <p class="mt-1">{{ $t('bank_info.bank_name') }}</p>
        <p>{{ $t('bank_info.iban') }} {{ BANK_INFO.iban }}</p>
        <p>{{ $t('bank_info.swift') }} {{ BANK_INFO.swift }}</p>
      </div>
    </div>

    <div v-if="form.values.dueDate" class="space-y-2">
      <h3 v-once class="text-sm font-medium text-muted-foreground">{{ $t('summary.due_date') }}</h3>
      <p class="text-base font-semibold">
        {{ formatDateLong(form.values.dueDate) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDateLong } from "@/utils/formatters";
import { usePaymentFormStore } from "@/stores/usePaymentForm.store.ts";
import { useI18n } from "@/composables/usei18n";
import { BANK_INFO } from "@/constants/form-options";

const { form } = usePaymentFormStore();
const { $t } = useI18n();
</script>
