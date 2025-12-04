<template>
  <div
    id="appWrapper"
    ref="widgetRefForStyle"
    class="min-h-[600px] relative font-general"
  >
    <div v-if="!isReady" class="text-4xl">Loading...</div>
    <RegisterView v-else />
  </div>
</template>

<script setup lang="ts">
import RegisterView from "@/views/RegisterView.vue";
import { useHooks } from "@/composables/hooks/useHooks.ts";
import { useTemplateRef } from "vue";
import { provideLocal } from "@vueuse/core";
import type { LangType } from "@/types/form.type.ts";

const {
  lang = import.meta.env.VITE_LANG || "en",
  uuid = import.meta.env.VITE_UUID,
} = defineProps<{ lang?: LangType; uuid: string }>();

console.log(233232);
provideLocal("lang", lang);
provideLocal("uuid", uuid);

const widget = useTemplateRef("widgetRefForStyle");
const { isReady } = useHooks(widget);
</script>

<style>
@import "@/assets/index.css";
</style>
