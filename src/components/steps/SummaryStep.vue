<template>
  <div class="space-y-6">
    <div v-if="values.salutation || values.firstName || values.lastName" class="space-y-2">
      <h3 v-once class="text-sm font-medium text-muted-foreground">
        Anrede und Name
      </h3>
      <p class="text-base font-semibold">
        {{ values.salutation }} {{ values.firstName }} {{ values.lastName }}
      </p>
    </div>

    <div v-if="values.email" class="space-y-2">
      <h3 v-once class="text-sm font-medium text-muted-foreground">Email</h3>
      <p class="text-base font-semibold">{{ values.email }}</p>
    </div>

    <div v-if="values.phone" class="space-y-2">
      <h3 v-once class="text-sm font-medium text-muted-foreground">Telefon</h3>
      <p class="text-base font-semibold">{{ values.phone }}</p>
    </div>

    <div v-if="values.street || values.zip || values.city || values.country" class="space-y-2">
      <h3 v-once class="text-sm font-medium text-muted-foreground">Adresse</h3>
      <div class="text-base font-semibold">
        <p v-if="values.street">{{ values.street }}</p>
        <p v-if="values.zip || values.city">
          {{ values.zip }}{{ values.zip && values.city ? ', ' : '' }}{{ values.city }}
        </p>
        <p v-if="values.country">{{ values.country }}</p>
      </div>
    </div>

    <div v-if="values.paymentMethod" class="space-y-2">
      <h3 v-once class="text-sm font-medium text-muted-foreground">Payment method</h3>
      <p class="text-base font-semibold">
        {{ values.paymentMethod === 'bank_transfer' ? 'Banküberweisung' : 'Kreditkarte' }}
      </p>
      <div v-once class="text-sm text-muted-foreground mt-2">
        <p>Si prega di versare l'importo die 284,00 € sul seguente conto bancario:</p>
        <p class="mt-1">Cassa di risparmio dell'Alto Adige</p>
        <p>IBAN IT000 0000 0000 0000 0000</p>
        <p>SWIFT 123456789</p>
      </div>
    </div>

    <div v-if="values.dueDate" class="space-y-2">
      <h3 v-once class="text-sm font-medium text-muted-foreground">Due date</h3>
      <p class="text-base font-semibold">{{ formatDateLong(values.dueDate) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IFormData } from '@/types/form.type.ts'
import { useFormContext } from 'vee-validate'
import { formatDateLong } from '@/utils/formatters'

const { values } = useFormContext<IFormData>()
</script>
