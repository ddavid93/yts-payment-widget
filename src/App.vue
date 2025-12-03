<template>
  <div
    id="appWrapper"
    ref="widgetRefForStyle"
    class="min-h-[600px] relative font-general"
  >
    <RegisterView />
  </div>
</template>

<script setup lang="ts">
import RegisterView from "@/views/RegisterView.vue";
</script>

<style>
@import "@/assets/index.css";
</style>
