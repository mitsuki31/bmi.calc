import pc from 'picocolors';
import Table from 'cli-table3';
import { Category } from '@bmi-calc/core';
import { capitalize } from '../utils/index.js';

const categories = {
  [Category.UNDERWEIGHT]: { range: '< 18.5', color: pc.cyan },
  [Category.HEALTHY]: { range: '18.5 - 24.9', color: pc.green },
  [Category.OVERWEIGHT]: { range: '25 - 29.9', color: pc.yellow },
  [Category.OBESITY]: { range: '≥ 30', color: pc.red },
  // TODO: Add more details
  // [Category.OBESITY_CLASS_I]: { range: '30 - 34.9', color: pc.red },
  // [Category.OBESITY_CLASS_II]: { range: '35 - 39.9', color: pc.red },
  // [Category.OBESITY_CLASS_III]: { range: '≥ 40', color: pc.red }
};

export const createBMICategoriesTable = (compact?: boolean, highlightType?: Category): Table.Table => {
  const maxLen = Object.keys(categories).reduce((max, key) => {
    return Math.max(max, categories[key as keyof typeof categories].range.length);
  }, 0);
  const table = new Table({
    head: ['Category', 'BMI Range'],
    colWidths: [maxLen + 2 + (!highlightType ? 0 : 1), 20],
    style: { head: ['bold'], compact },
  });
  table.push(
    ...Object.keys(categories).map((key) => {
      const category = categories[key as keyof typeof categories];
      return [
        (highlightType === key ? '*' : '') + category.color(capitalize(key)),
        pc.italic(category.range)
      ];
    }),
  );

  return table;
};
