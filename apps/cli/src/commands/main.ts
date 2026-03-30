import type { Argv, Options } from 'yargs';
import bmiCommand from './bmi.js';
import calcCommand from './calc.js';
import globalOptions from './options/global.js';
import miscOptions from './options/misc.js';

function buildMiscOptions(yargs: Argv, opts: Record<string, Options>) {
  return yargs.version(false).options(opts);
}

export default function builder(yargs: Argv): Argv {
  return buildMiscOptions(
    yargs
      .usage('$0 --weight <N> --height <N> [--unit <cm|m>]')
      // Set groups first
      .group([], 'Command Options:')
      .group([], 'Global Options:')
      .group([], 'Misc Options:')

      .command(bmiCommand)
      .command(calcCommand)
      .options(globalOptions)
      .group(Object.keys(globalOptions), 'Global Options:'),
    miscOptions,
  ).group([...Object.keys(miscOptions), 'help'], 'Misc Options:');
}
