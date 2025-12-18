<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import BMICalculator from '@/components/layout/BMICalculator.vue';

  const isLoading = ref(true);

  onMounted(() => {
    // Remove loading state after component mounts
    setTimeout(() => {
      isLoading.value = false;
    }, 300);
  });
</script>

<template>
  <main class="min-h-screen font-sans relative overflow-hidden">
    <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center">
      <span class="sr-only">Loading contents...</span>
      <div class="animate-spin rounded-full h-16 w-16 border-4 border-white/30 border-t-white"></div>
    </div>

    <div class="absolute w-100 h-100 bg-green-300 rounded-full left-0 top-[40%] blur-[10em] opacity-90 -my-10 -mx-40"></div>
    <div class="absolute w-100 h-100 bg-green-300 rounded-full right-0 top-[40%] blur-[10em] opacity-90 -mx-40"></div>

    <div v-if="!isLoading" class="relative z-10">
      <header class="px-6 pt-8 pb-4">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex-1">
            <h1
              :class="[
                'text-3xl md:text-4xl font-bold tracking-tight mb-2 animate-fade-in',
                'bg-linear-to-r from-health-primary-light via-health-secondary-light via-20% to-health-tertiary-light',
                'bg-clip-text text-transparent',
              ]"
            >
              BMI Calculator
            </h1>
            <p
              class="text-sm md:text-base max-w-2xl leading-relaxed animate-slide-up text-gray-300"
            >
              Body Mass Index (BMI) is a simple measure that relates body weight to height to screen
              for weight-related health risk. Calculate your BMI and track your wellness journey.
            </p>
          </div>
        </div>
      </header>

      <section class="min-h-[calc(100vh-8rem)] grid place-items-center px-6 py-8 md:py-0">
        <div
          class="w-full max-w-7xl mx-auto animate-slide-up glass-card-dark shadow-modern-lg rounded-2xl p-6 md:p-8"
        >
          <BMICalculator />
        </div>
      </section>

      <footer class="px-6 py-6 text-center">
        <small class="text-sm font-medium text-gray-400/80">
          &copy; {{ new Date().getFullYear() }} bmi.calc • Your wellness journey starts here
        </small>
      </footer>
    </div>
  </main>
</template>
