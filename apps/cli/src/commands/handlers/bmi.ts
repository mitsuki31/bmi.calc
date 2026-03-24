/// <reference types="../../types/index.d.ts" />

import type { Argv } from 'yargs';
import { calculateBMI, getCategory } from '@bmi-calc/core';
import { printBMIResult } from '../../ui/outputs.js';

export function bmiHandler(argv: Awaited<Argv["argv"]>) {
  const { weight, height, unit } = argv as unknown as BMIHandlerArgv;
  const bmi = calculateBMI(weight, { value: height, unit });
  const category = getCategory(bmi);

  printBMIResult({ bmi, category });
}
