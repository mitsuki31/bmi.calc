import type { Argv } from 'yargs';
import bmiCommand from './bmi.js';
import calcCommand from './calc.js';

export default function builder(yargs: Argv): Argv {
  return yargs
    .usage('$0 --weight <N> --height <N> [--unit <cm|m>]')
    .command(bmiCommand)
    .command(calcCommand);
}
