<template>
  <div id="appWrapper" ref="widgetRefForStyle" class="font-general">
    <div v-if="!isReady" class="text-4xl">Loading...</div>

    <div v-else-if="isError" class="w-md mx-auto">
      <Alert variant="destructive">
        <AlertTitle>Unable to fetch the settings.</AlertTitle>
      </Alert>
    </div>

    <PaymentWidget v-else />
  </div>
</template>

<script setup lang="ts">
import PaymentWidget from "@/components/PaymentWidget.vue";
import { useHooks } from "@/composables/hooks/useHooks.ts";
import { useTemplateRef } from "vue";
import { provideLocal } from "@vueuse/core";
import type { LangType } from "@/types/form.type.ts";
import { Alert, AlertTitle } from "@/components/ui/alert";

const {
  lang = import.meta.env.VITE_LANG || "en",
  uuid = import.meta.env.VITE_UUID,
} = defineProps<{ lang?: LangType; uuid: string }>();

provideLocal("lang", lang);
provideLocal("uuid", uuid);

const widget = useTemplateRef("widgetRefForStyle");
const { isReady, isError } = useHooks(widget);
</script>

<style>
@import "@/assets/index.css";
</style>
