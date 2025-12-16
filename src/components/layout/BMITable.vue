<script setup lang="ts">
  import { computed } from 'vue';
  import { Category, getCategory } from '@/core/bmi';

  const props = defineProps<{
    bmi?: number | null;
  }>();

  const activeCategory = computed<Category | null>(() => {
    if (props?.bmi === null || typeof props?.bmi === 'undefined') return null;
    return getCategory(props.bmi);
  });

  function rowClass(category: Category | null) {
    return [
      'transition-colors',
      'border-b border-neutral-800',
      activeCategory.value === category ? 'bg-neutral-800 text-neutral-100' : 'text-neutral-300',
    ];
  }
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full max-w-4xl border-collapse rounded-xl border border-neutral-800 text-sm">
      <thead class="bg-neutral-900">
        <tr>
          <th colspan="2" class="px-4 py-3 text-center font-bold text-xl text-neutral-200">
            BMI Table
          </th>
        </tr>
        <tr class="border-t border-neutral-800">
          <th class="px-4 py-2 text-left font-bold text-neutral-300">Category</th>
          <th class="px-4 py-2 text-left font-bold text-neutral-300">Range</th>
        </tr>
      </thead>

      <tbody>
        <tr :class="rowClass(Category.UNDERWEIGHT)">
          <td class="px-4 py-2 font-semibold">Underweight</td>
          <td class="px-4 py-2">
            <span class="not-sr-only">&lt;=</span> 18.4
            <span class="sr-only">18.4 or below</span>
          </td>
        </tr>

        <tr :class="rowClass(Category.HEALTHY)">
          <td class="px-4 py-2 font-semibold">Healthy</td>
          <td class="px-4 py-2">18.5 – 24.9</td>
        </tr>

        <tr :class="rowClass(Category.OVERWEIGHT)">
          <td class="px-4 py-2 font-semibold">Overweight</td>
          <td class="px-4 py-2">25.0 – 29.9</td>
        </tr>

        <tr :class="rowClass(Category.OBESITY)">
          <td class="px-4 py-2 font-semibold">Obesity</td>
          <td class="px-4 py-2">
            <span class="not-sr-only">&gt;=</span> 30.0
            <span class="sr-only">30.0 or above</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
