import type { Argv, Options } from 'yargs';
import bmiCommand from './bmi.js';
import calcCommand from './calc.js';
import miscOptions from './options/misc.js';

function buildMiscOptions(yargs: Argv, opts: Record<string, Options>) {
  return yargs.version(false).options(opts);
}

export default function builder(yargs: Argv): Argv {
  return buildMiscOptions(
    // prettier-ignore
    yargs
      .usage('$0 --weight <N> --height <N> [--unit <cm|m>]')
      .group([], 'Command Options:')
      .group([], 'Global Options:')
      .group([], 'Misc Options:')

      .command(bmiCommand)
      .command(calcCommand)
    , miscOptions
  ).group([...Object.keys(miscOptions), 'help'], 'Misc Options:');
}
