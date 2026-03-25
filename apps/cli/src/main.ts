#!/usr/bin/env node

import Yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { APP_NAME, SCRIPT_NAME, VERSION } from './config/constants.js';
import mainCommandBuilder from './commands/main.js';

const maxWidth = process.stdout.columns || null;

const yargs = Yargs(hideBin(process.argv)).scriptName(SCRIPT_NAME).wrap(maxWidth);

mainCommandBuilder(yargs)
  .recommendCommands()

  // -- Misc options
  .version(false)
  .option('version', {
    alias: ['v'],
    type: 'boolean',
    description: 'Show version information',
    global: true,
    coerce: (value) => {
      if (value) {
        console.log(`${APP_NAME} v${VERSION}`);
        process.exit(0);
      }
      return false;
    },
  })

  .help()
  .alias('?', 'help')

  // -- Error handling
  .strict()
  .showHelpOnFail(false)
  .fail((message, error) => {
    if (message) console.error(message);
    if (error) console.error(error);
    console.error('See --help for usage information');
    process.exit(process.exitCode || 1);
  })
  .parse();
