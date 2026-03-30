/// <reference types="../../types/index.d.ts" />

import type { Argv } from 'yargs';
import { calculateBMI, getCategory } from '@bmi-calc/core';
import { printBMIResult, printBMIResultAsJSON } from '../../ui/outputs.js';

export function calcHandler(argv: Awaited<Argv['argv']>) {
  const { weight, height, unit, json } = argv as unknown as BMIHandlerArgv;
  const bmi = calculateBMI(weight, { value: height, unit });
  const category = getCategory(bmi);

  if (json) {
    // No worry about piping to file, the output will no have colors
    printBMIResultAsJSON({ bmi, category }, process.stdout.isTTY);
    return;
  }
  printBMIResult({ bmi, category });
};
