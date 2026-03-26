#!/usr/bin/env node

import Yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { APP_NAME, SCRIPT_NAME } from './config/constants.js';
import mainCommandBuilder from './commands/main.js';

const maxWidth = process.stdout.columns || null;

function run() {
  // prettier-ignore
  let yargs = Yargs(hideBin(process.argv))
    .scriptName(SCRIPT_NAME)
    .wrap(maxWidth);

  // Build main commands
  mainCommandBuilder(yargs)
    .help()
    .alias('?', 'help')
    .recommendCommands()

    // -- Error handling
    .strict()
    .showHelpOnFail(false)
    .fail((message, _error) => {
      if (message) console.error(message);
      // ? Do we need to show the error trace on debug mode?
      // if (error) console.error(error);
      console.error(`Use \`${APP_NAME} --help\` for usage information`);
      process.exit(process.exitCode || 1);
    })
    .parse();
}

run();
