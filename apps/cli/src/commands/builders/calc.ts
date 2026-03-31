import type { Argv } from 'yargs';
import { validatePositiveNumber } from '../../utils/validator.js';

export function calcBuilder(yargs: Argv) {
  return yargs
    .usage('$0 calc <weight> <height> [--unit <cm|m>]')
    .positional('weight', {
      describe: 'Weight value (kg)',
      type: 'number',
      coerce: (value) => validatePositiveNumber(value, 'Weight'),
    })
    .positional('height', {
      describe: 'Height value (use --unit to specify unit)',
      type: 'number',
      coerce: (value) => validatePositiveNumber(value, 'Height'),
    })
    .option('unit', {
      alias: 'u',
      describe: 'Height unit (cm or m)',
      choices: ['cm', 'm'],
      default: 'cm',
    })
    .group(['unit'], 'Command Options:')
    .example([
      ['$0 calc 70 170', 'Calculate BMI'],
      ['$0 calc 70 1.7 --unit m', 'Using meters'],
    ]);
}
