<script setup lang="ts">
// Layout for authentication pages
// Features a split design: Image on the left (desktop), Content on the right
</script>

<template>
  <div class="min-h-screen w-full lg:grid lg:grid-cols-2">
    <!-- Left Side: Image/Branding -->
    <div class="hidden lg:block relative h-full w-full bg-muted">
      <img
        src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80"
        alt="Office background"
        class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
      <div class="absolute inset-0 bg-zinc-900/20" />
      <div class="relative z-20 flex h-full flex-col justify-between p-10 text-white">
        <div class="flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Yanovis Forms
        </div>
        <div class="relative z-20 mt-auto">
          <blockquote class="space-y-2">
            <p class="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than
              ever before.&rdquo;
            </p>
            <footer class="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
    </div>

    <!-- Right Side: Content/Form -->
    <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <slot />
      </div>
    </div>
  </div>
</template>
