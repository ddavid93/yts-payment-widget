<template>
  <div class="flex flex-col items-center justify-center space-y-6 py-12">
    <div class="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary">
      <CheckCircle2 class="h-12 w-12 text-primary" />
    </div>

    <div class="space-y-2 text-center">
      <h2 v-once class="text-3xl font-bold tracking-tight">
        {{ $t('confirmation.title') }}
      </h2>
      <p v-once class="text-muted-foreground">
        {{ $t('confirmation.subtitle') }}
      </p>
      <p v-once class="text-sm text-muted-foreground">
        {{ $t('confirmation.message') }}
      </p>
    </div>

    <Button type="button" variant="outline" class="mt-8" @click="emit('reset')">
      {{ $t('confirmation.back_home') }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import type { IStepEmits } from '@/types/form.type.ts'
import { CheckCircle2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/composables/usei18n'

const emit = defineEmits<IStepEmits>()
const { $t } = useI18n()
</script>
