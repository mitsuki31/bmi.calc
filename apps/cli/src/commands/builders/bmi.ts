import type { Argv } from 'yargs';
import { validatePositiveNumber } from '../../utils/validator.js';

export function bmiBuilder(yargs: Argv): Argv {
  return yargs
    .option('weight', {
      type: 'number',
      alias: 'w',
      describe: 'Weight value (kg)',
      demandOption: true,
      coerce: (value) => validatePositiveNumber(value, 'Weight'),
    })
    .option('height', {
      type: 'number',
      alias: 'h',
      describe: 'Height value',
      demandOption: true,
      coerce: (value) => validatePositiveNumber(value, 'Height'),
    })
    .option('unit', {
      alias: 'u',
      choices: ['cm', 'm'],
      default: 'cm',
      describe: 'Height unit (cm or m)',
    })
    .example([
      ['$0 --weight 70 --height 170', 'Calculate BMI'],
      ['$0 -w 70 -h 1.7 -u m', 'Using meters'],
    ]);
}
