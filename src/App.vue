<template>
  <div id="appWrapper" ref="widgetRefForStyle" class="font-general">
    <div v-if="!isReady" class="text-4xl">Loading...</div>

    <div v-else-if="isError" class="w-md mx-auto">
      <Alert variant="destructive">
        <AlertTitle>Unable to fetch the settings.</AlertTitle>
      </Alert>
    </div>

    <Transition name="fade-100" mode="out-in" appear>
      <PaymentWidget v-if="isReady && !isError" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import PaymentWidget from "@/components/PaymentWidget.vue";
import { useHooks } from "@/composables/hooks/useHooks.ts";
import { useTemplateRef } from "vue";
import { provideLocal } from "@vueuse/core";
import type { LangType } from "@/types/form.type.ts";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useI18n } from "@/composables/i18n";
import {
  LangSymbolKey,
  RefWidgetKey,
  UuidSymbolKey,
} from "@/constants/symbols.ts";

const {
  lang = import.meta.env.VITE_LANG || "en",
  uuid = import.meta.env.VITE_UUID,
} = defineProps<{ lang?: LangType; uuid: string }>();

useI18n(lang);

const widget = useTemplateRef("widgetRefForStyle");

provideLocal(LangSymbolKey, lang);
provideLocal(UuidSymbolKey, uuid);
provideLocal(RefWidgetKey, widget);

const { isReady, isError } = useHooks();
</script>

<style>
@import "@/assets/index.css";
</style>
