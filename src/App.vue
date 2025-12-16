<script setup lang="ts">
  import BMICalculator from '@/components/layout/BMICalculator.vue';
</script>

<template>
  <main class="min-h-screen bg-neutral-950 text-neutral-200 font-sans">
    <header class="px-6 pt-4 pb-4 border-b border-neutral-800">
      <h1 class="text-2xl font-semibold tracking-tight">BMI Calculator</h1>
      <p class="mt-1 font-medium text-sm text-neutral-400 max-w-xl">
        Body Mass Index (BMI) is a simple measure that relates body weight to height to screen for
        weight-related health risk.
      </p>
    </header>

    <section class="min-h-[calc(100svh-11rem)] grid place-items-center px-6 py-6 md:py-0">
      <BMICalculator />
    </section>

    <footer class="px-6 py-4 border-t border-neutral-800 text-center">
      <small class="text-xs text-neutral-500"> &copy; 2025 bmi.calc </small>
    </footer>
  </main>
</template>
