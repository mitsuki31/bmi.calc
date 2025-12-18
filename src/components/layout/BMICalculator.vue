<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { calculateBMI, type Height } from '@/core/bmi';
  import BMITable from './BMITable.vue';

  const weightKg = ref<number | null>(null);
  const heightValue = ref<Height['value'] | null>(null);
  const heightUnit = ref<Height['unit']>('cm');

  const bmi = computed<number | null>(() => {
    if (
      weightKg.value === null ||
      heightValue.value === null ||
      weightKg.value <= 0 ||
      heightValue.value <= 0
    ) {
      return null;
    }

    return calculateBMI(weightKg.value, {
      value: heightValue.value,
      unit: heightUnit.value,
    });
  });

  const formattedBMI = computed(() => (bmi.value !== null ? bmi.value.toFixed(2) : null));

  const bmiCategory = computed(() => {
    if (bmi.value === null) return null;

    if (bmi.value < 18.5) return { name: 'Underweight', color: 'text-blue-500' };
    if (bmi.value < 25) return { name: 'Healthy', color: 'text-green-500' };
    if (bmi.value < 30) return { name: 'Overweight', color: 'text-yellow-500' };
    return { name: 'Obesity', color: 'text-red-500' };
  });
</script>

<template>
  <div class="w-full max-w-7xl mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      <!-- Left: Calculator -->
      <div class="space-y-8">
        <!-- Header -->
        <div class="text-center space-y-2">
          <h2 class="text-2xl md:text-3xl font-bold tracking-tight text-white">BMI Calculator</h2>
          <p class="text-sm md:text-base text-gray-300/90">
            Calculate your Body Mass Index to track your wellness journey
          </p>
        </div>

        <!-- Form -->
        <div class="space-y-6">
          <!-- Weight -->
          <div class="space-y-2">
            <label for="in-weight" class="block text-sm font-semibold mb-2 text-gray-300">
              Weight <span class="sr-only">in kilograms</span>
            </label>
            <div class="flex gap-4 items-center max-w-[85%]">
              <input
                id="in-weight"
                type="number"
                min="0"
                step="0.1"
                v-model.number="weightKg"
                :class="[
                  'flex-1 rounded-xl px-4 py-3 text-lg font-medium backdrop-blur-sm text-gray-300',
                  'bg-black/20 border-white/10 text-white placeholder-gray-400',
                  'focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-health-primary-dark focus:border-health-primary-dark',
                ]"
                placeholder="Enter your weight"
              />
              <span
                aria-hidden="true"
                :class="[
                  'font-bold px-[1.65rem] py-3 rounded-xl self-center transition-all duration-300',
                  'text-gray-200 bg-black/10 border border-health-primary-dark',
                ]"
              >
                KG
              </span>
            </div>
          </div>

          <!-- Height -->
          <div class="space-y-2">
            <label for="in-height" class="block text-sm font-semibold mb-2 text-gray-300">
              Height
              <span class="sr-only">in {{ heightUnit === 'cm' ? 'centimeters' : 'meters' }}</span>
            </label>
            <div class="flex gap-3 items-center max-w-[85%]">
              <input
                id="in-height"
                type="number"
                min="0"
                step="0.1"
                v-model.number="heightValue"
                :class="[
                  'flex-1 rounded-xl px-4 py-3 text-lg font-medium backdrop-blur-sm',
                  'border transition-all duration-300',
                  'bg-black/20 border-white/10 text-white placeholder-gray-400',
                  'focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-health-primary-dark focus:border-health-primary-dark',
                ]"
                placeholder="Enter your height"
              />
              <select
                v-model="heightUnit"
                :class="[
                  'rounded-xl px-4 py-3 text-lg font-medium backdrop-blur-sm',
                  'border transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-offset-1',
                  'bg-health-secondary-dark border-white/10 text-white focus:ring-health-primary focus:border-health-primary',
                ]"
              >
                <option value="cm">cm</option>
                <option value="m">m</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Result -->
        <div
          v-if="formattedBMI"
          :class="[
            'rounded-2xl px-6 py-5 border backdrop-blur-sm transition-all duration-300 hover-lift',
            'border-white/10 bg-black/20',
          ]"
        >
          <div class="text-center space-y-3">
            <p class="text-sm font-semibold uppercase tracking-wide text-gray-400">Your BMI</p>
            <p class="text-4xl md:text-5xl font-bold tracking-tight text-white">
              {{ formattedBMI }}
            </p>
            <div v-if="bmiCategory" class="flex items-center justify-center gap-2">
              <div :class="['w-2 h-2 rounded-full', bmiCategory.color.replace('text-', 'bg-')]"></div>
              <p :class="['text-sm font-semibold', bmiCategory.color]">
                {{ bmiCategory.name }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Table -->
      <div class="self-start">
        <BMITable :bmi="formattedBMI ? Number(formattedBMI) : null" />
      </div>
    </div>
  </div>
</template>
