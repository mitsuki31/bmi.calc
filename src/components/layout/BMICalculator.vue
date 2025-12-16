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
</script>

<template>
  <div class="space-y-6 w-full max-w-6xl rounded-xl border border-orange-400 p-6 mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Left: Calculator -->
      <div class="space-y-6">
        <div class="space-y-4">
          <p class="font-mono text-xl text-center">bmi.calc</p>

          <!-- Weight -->
          <div>
            <label for="in-weight" class="block text-sm text-neutral-400 mb-1">
              Weight <span class="sr-only">in kilograms</span>
            </label>
            <div class="flex gap-2">
              <input
                id="in-weight"
                type="number"
                min="0"
                step="0.1"
                v-model.number="weightKg"
                class="flex-1 rounded-md bg-neutral-900 border border-neutral-800 px-3 py-2 text-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-600"
              />
              <span class="font-bold px-2 self-center">KG</span>
            </div>
          </div>

          <!-- Height -->
          <div>
            <label for="in-height" class="block text-sm text-neutral-400 mb-1"> Height </label>
            <div class="flex gap-2 items-center">
              <input
                id="in-height"
                type="number"
                min="0"
                step="0.1"
                v-model.number="heightValue"
                class="flex-1 rounded-md bg-neutral-900 border border-neutral-800 px-3 py-2 text-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-600"
              />
              <select
                v-model="heightUnit"
                class="rounded-md bg-neutral-900 border border-neutral-800 px-3 py-2 text-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-600"
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
          class="rounded-md border border-neutral-800 bg-neutral-900 px-4 py-3"
        >
          <p class="text-sm text-neutral-400">Your BMI</p>
          <p class="text-2xl font-semibold tracking-tight">
            {{ formattedBMI }}
          </p>
        </div>
      </div>

      <!-- Right: Table -->
      <div class="self-start">
        <BMITable :bmi="formattedBMI ? Number(formattedBMI) : null" />
      </div>
    </div>
  </div>
</template>
