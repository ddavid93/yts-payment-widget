<script setup lang="ts">
import type { IStepEmits } from '@/types/form'
import { CheckCircle2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const emit = defineEmits<IStepEmits>()
</script>

<template>
  <div class="flex flex-col items-center justify-center space-y-6 py-12">
    <div class="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary">
      <CheckCircle2 class="h-12 w-12 text-primary" />
    </div>

    <div class="space-y-2 text-center">
      <h2 v-once class="text-3xl font-bold tracking-tight">
        Zahlung erfolgreich abgeschlossen.
      </h2>
      <p v-once class="text-muted-foreground">
        Vielen dank für Ihre Buchung!
      </p>
      <p v-once class="text-sm text-muted-foreground">
        Sie erhalten in Kürze eine Bestätigungsmail mit den Details zu Ihrer Buchung.
      </p>
    </div>

    <Button type="button" variant="outline" @click="emit('reset')" class="mt-8">
      Back to the homepage
    </Button>
  </div>
</template>
