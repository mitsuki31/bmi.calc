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

  const rowClass = (category: Category | null) => [
    'transition-all duration-300',
    activeCategory.value === category
      ? 'border-l-6 border-health-primary-light bg-health-primary-light/9'
      : 'border-b text-gray-700 hover:bg-white/5',
    'hover:backdrop-blur-sm',
  ];

  const getCategoryColor = (category: Category) => {
    switch (category) {
      case Category.UNDERWEIGHT:
        return 'text-blue-500';
      case Category.HEALTHY:
        return 'text-green-500';
      case Category.OVERWEIGHT:
        return 'text-yellow-500';
      case Category.OBESITY:
        return 'text-red-500';
      default:
        return '';
    }
  };

  const getCategoryDotColor = (category: Category) => {
    switch (category) {
      case Category.UNDERWEIGHT:
        return 'bg-blue-500';
      case Category.HEALTHY:
        return 'bg-green-500';
      case Category.OVERWEIGHT:
        return 'bg-yellow-500';
      case Category.OBESITY:
        return 'bg-red-500';
      default:
        return '';
    }
  };

  const getCategoryName = (category: Category) => {
    switch (category) {
      case Category.UNDERWEIGHT:
        return 'Underweight';
      case Category.HEALTHY:
        return 'Healthy Weight';
      case Category.OVERWEIGHT:
        return 'Overweight';
      case Category.OBESITY:
        return 'Obesity';
      default:
        return '';
    }
  };

  const getBMIRange = (category: Category) => {
    switch (category) {
      case Category.UNDERWEIGHT:
        return { text: '<= 18.4', srOnly: '18.4 or below' };
      case Category.HEALTHY:
        return { text: '18.5 - 24.9', srOnly: 'Between range 18.5 and 24.9' };
      case Category.OVERWEIGHT:
        return { text: '25.0 - 29.9', srOnly: 'Between range 25.0 and 29.9' };
      case Category.OBESITY:
        return { text: '>= 30.0', srOnly: '30.0 or above' };
      default:
        return { text: '', srOnly: null };
    }
  };

  const categories = [
    Category.UNDERWEIGHT,
    Category.HEALTHY,
    Category.OVERWEIGHT,
    Category.OBESITY,
  ];
</script>

<template>
  <div class="w-full">
    <div class="text-center mb-6">
      <h3 class="text-xl md:text-2xl font-bold tracking-tight mb-2 text-white">BMI Categories</h3>
      <p class="text-sm text-gray-300">Understanding your Body Mass Index range</p>
    </div>

    <div
      class="overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300 hover-lift"
    >
      <table class="w-full border-collapse text-sm border-white/20 bg-white/5 backdrop-blur-sm">
        <thead>
          <tr class="border-b bg-white/10 text-gray-900 border-white/20">
            <th
              colspan="2"
              :class="[
                'px-6 py-4 text-gray-200 text-center font-bold text-lg',
                'bg-linear-to-r from-health-secondary-dark via-health-secondary-light via-35% to-health-secondary-dark',
              ]"
            >
              BMI Reference Table
            </th>
          </tr>
          <tr class="border-b bg-white/10 text-gray-900 border-white/20">
            <th class="px-5 sm:px-6 py-3 text-gray-300 text-left font-bold">Category</th>
            <th class="px-6 py-3 text-gray-300 text-left font-bold">BMI Range</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="category in categories" :key="category" :class="rowClass(category)">
            <td class="px-4 sm:px-6 py-4">
              <div class="flex items-center gap-3">
                <div :class="['w-3 h-3 rounded-full', getCategoryDotColor(category)]"></div>
                <span :class="['font-semibold', getCategoryColor(category)]">
                  {{ getCategoryName(category) }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4">
              <span class="text-gray-200">
                <span class="not-sr-only" aria-hidden="true">{{ getBMIRange(category).text }}</span>
                <span v-if="getBMIRange(category).srOnly" class="sr-only">
                  {{ getBMIRange(category).srOnly }}
                </span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Additional info card -->
    <div
      class="mt-6 p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 border-white/20 bg-white/5' : 'border-white/10 bg-black/10"
    >
      <div class="flex items-start gap-3">
        <div class="w-2 h-8 rounded-full my-auto bg-health-primary"></div>
        <div>
          <p class="text-xs font-semibold mb-1 text-gray-100">Health Note</p>
          <p class="text-xs leading-relaxed text-gray-300">
            BMI is a screening tool and not a diagnostic test. Consult with healthcare professionals
            for personalized health assessments.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
