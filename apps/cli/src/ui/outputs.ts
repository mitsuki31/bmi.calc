import { inspect } from 'node:util';
import pc from 'picocolors';
import Table from 'cli-table3';
import { Category } from '@bmi-calc/core';
import { capitalize, stripANSI } from '../utils/index.js';
import { createBMICategoriesTable } from './tables.js';

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
  const terminalWidth = process.stdout.columns;
  const gapSpace = 5;

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
    [' BMI Classification', ' ──────────────────'],
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

  const shouldGotoNewline = terminalWidth < table1_maxLen + table2_maxLen + gapSpace;

  process.stdout.write('\n');
  if (!shouldGotoNewline) {
    console.log(title.map((row) => row.join(' '.repeat(gapSpace))).join('\n'));
    for (let i = 0; i < table1.split('\n').length; i++) {
      console.log(table1.split('\n')[i] + ' '.repeat(gapSpace) + table2.split('\n')[i]);
    }
  } else {
    console.log(`${title[0][0]}\n${title[1][0].trimEnd()}`);
    console.log(table1.trimEnd() + '\n');
    console.log(`${title[0][1]}\n${title[1][1].trimEnd()}`);
    console.log(table2);
  }
}

export function printBMIResultAsJSON(result: BMIResult, colors?: boolean): void {
  const jsonResult = formatToJSON(result);
  if (colors) {
    console.log(pc.green(jsonResult));
  } else {
    console.log(jsonResult);
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

/**
 * Formats BMI result to JSON
 * @param result - BMI result
 * @returns Formatted BMI result
 */
export function formatToJSON(result: BMIResult): string {
  return JSON.stringify(
    {
      bmi: result.bmi.toFixed(2),
      category: capitalize(result.category) as Capitalize<Category>,
      // TODO: Add range for the category
      // range: ...
    } satisfies BMIResultJSON,
    null,
    2,
  );
}
