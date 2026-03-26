import pc from 'picocolors';
import Table from 'cli-table3';
import { Category } from '@bmi-calc/core';
import { capitalize, stripANSI } from '../utils/index.js';
import { createBMICategoriesTable } from './tables.js';

export interface BMIResult {
  bmi: number;
  category: Category;
}

/**
 * Prints BMI result in a table with BMI classification table (compact)
 * @param result - BMI result
 */
export function printBMIResult(result: BMIResult): void {
  const tableTemplate = {
    // Rows and columns must be equal length
    rows: ['BMI', 'Category'],
    cols: [formatBMI(result.bmi), formatCategory(capitalize(result.category))],
  };
  const maxLen = tableTemplate.rows.reduce((max, row) => {
    return Math.max(max, row.length);
  }, 0);
  const table = new Table({
    colWidths: [maxLen + 2, 20],
    wordWrap: true,
  });
  const gapSpace = 10;

  table.push(
    tableTemplate.rows.map((row) => pc.bold(row)),
    tableTemplate.cols,
  );
  let table1 = table.toString();
  const table2 = createBMICategoriesTable(true).toString();
  const table1_maxLen = stripANSI(table1).split('\n')[0].length;
  const table2_maxLen = stripANSI(table2).split('\n')[0].length;
  // Add some newlines to table 1
  const remainLines = table2.split('\n').length - table1.split('\n').length;
  if (remainLines > 0) {
    table1 += `\n${' '.repeat(table1_maxLen)}`.repeat(remainLines);
  }

  const titleTexts = [
    [' BMI Result', ' ──────────'],
    ['BMI Classification', '──────────────────'],
  ];
  const title = [
    [
      pc.bold(titleTexts[0][0]) + ' '.repeat(table1_maxLen - titleTexts[0][0].length),
      pc.bold(titleTexts[1][0]) + ' '.repeat(table2_maxLen - titleTexts[1][0].length),
    ],
    [
      titleTexts[0][1] + ' '.repeat(table1_maxLen - titleTexts[0][1].length),
      titleTexts[1][1] + ' '.repeat(table2_maxLen - titleTexts[1][1].length),
    ],
  ];

  process.stdout.write('\n');
  console.log(title.map((row) => row.join(' '.repeat(gapSpace))).join('\n'));
  for (let i = 0; i < table1.split('\n').length; i++) {
    console.log(table1.split('\n')[i] + ' '.repeat(gapSpace) + table2.split('\n')[i]);
  }
}

/**
 * Prints BMI classification table
 */
export function printCategoriesTable(): void {
  const table = createBMICategoriesTable();
  console.log(`\n ${pc.bold('BMI Classification')}`);
  console.log(' ──────────────────');
  console.log(table.toString());
}

/**
 * Prints error message
 * @param message - Error message
 */
export function printError(message: string): void {
  console.error(pc.red(`Error: ${message}`));
}

/**
 * Prints info message
 * @param message - Info message
 */
export function printInfo(message: string): void {
  console.log(pc.cyan(message));
}

/**
 * Formats BMI value
 * @param value - BMI value
 * @returns Formatted BMI value
 */
export function formatBMI(value: number): string {
  return pc.cyan(value.toFixed(2));
}

/**
 * Formats BMI category
 * @param category - BMI category
 * @returns Formatted BMI category
 */
export function formatCategory(category: string): string {
  const tmp = category;
  switch (tmp.toLowerCase()) {
    case Category.UNDERWEIGHT:
      return pc.blue(category);
    case Category.HEALTHY:
      return pc.green(category);
    case Category.OVERWEIGHT:
      return pc.yellow(category);
    case Category.OBESITY:
      return pc.red(category);
    default:
      return category;
  }
}
