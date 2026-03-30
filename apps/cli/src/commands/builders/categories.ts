import type { Argv } from 'yargs';

export function categoriesBuilder(yargs: Argv) {
  return yargs.usage('$0 categories');
}
