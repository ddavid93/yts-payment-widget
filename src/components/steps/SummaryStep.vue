<template>
  <div class="space-y-6">
    <div
      v-if="
        form.values.salutation || form.values.firstName || form.values.lastName
      "
      class="space-y-2"
    >
      <h3 v-once class="text-sm font-medium text-muted-foreground">
        Anrede und Name
      </h3>
      <p class="text-base font-semibold">
        {{ form.values.salutation }} {{ form.values.firstName }}
        {{ form.values.lastName }}
      </p>
    </div>

    <div v-if="form.values.email" class="space-y-2">
      <h3 v-once class="text-sm font-medium text-muted-foreground">Email</h3>
      <p class="text-base font-semibold">{{ form.values.email }}</p>
    </div>

    <div v-if="form.values.phone" class="space-y-2">
      <h3 v-once class="text-sm font-medium text-muted-foreground">Telefon</h3>
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
      <h3 v-once class="text-sm font-medium text-muted-foreground">Adresse</h3>
      <div class="text-base font-semibold">
        <p v-if="form.values.street">{{ form.values.street }}</p>
        <p v-if="form.values.zip || form.values.city">
          {{ form.values.zip
          }}{{ form.values.zip && form.values.city ? ", " : ""
          }}{{ form.values.city }}
        </p>
        <p v-if="form.values.country">{{ form.values.country }}</p>
      </div>
    </div>

    <div v-if="form.values.paymentMethod" class="space-y-2">
      <h3 v-once class="text-sm font-medium text-muted-foreground">
        Payment method
      </h3>
      <p class="text-base font-semibold">
        {{
          form.values.paymentMethod === "bank_transfer"
            ? "Banküberweisung"
            : "Kreditkarte"
        }}
      </p>
      <div v-once class="text-sm text-muted-foreground mt-2">
        <p>
          Si prega di versare l'importo die 284,00 € sul seguente conto
          bancario:
        </p>
        <p class="mt-1">Cassa di risparmio dell'Alto Adige</p>
        <p>IBAN IT000 0000 0000 0000 0000</p>
        <p>SWIFT 123456789</p>
      </div>
    </div>

    <div v-if="form.values.dueDate" class="space-y-2">
      <h3 v-once class="text-sm font-medium text-muted-foreground">Due date</h3>
      <p class="text-base font-semibold">
        {{ formatDateLong(form.values.dueDate) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDateLong } from "@/utils/formatters";
import { usePaymentFormStore } from "@/stores/usePaymentForm.store.ts";
import { toRaw } from "vue";

const { form } = usePaymentFormStore();

console.log(toRaw(form.values));
</script>
