// Global type definitions for @bmi-calc/cli
// Project: bmi-calc
// Definitions by: Ryuu Mitsuki (https://github.com/mitsuki31)

declare interface BMIHandlerArgv {
  // --weight
  w: number;
  weight: number;

  // --height
  h: number;
  height: number;

  // --unit
  u: 'cm' | 'm';
  unit: 'cm' | 'm';

  // --json
  J: boolean;
  json: boolean;

  // --no-color
  'no-color': boolean;
  noColor: boolean;
}

declare interface BMIResult {
  bmi: number;
  category: Category;
}

declare interface BMIResultJSON {
  bmi: string; // Formatted to 2 decimal places
  category: Capitalize<import('@bmi-calc/core').Category>;
}
