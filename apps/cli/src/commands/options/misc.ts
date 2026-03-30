// Contains misc options that are not related to any specific command

import type { Options } from 'yargs';
import { APP_NAME, VERSION } from '../../config/constants.js';

// ! MAKE SURE TO ADD `global: true` PROPERTY TO EACH OPTION

export default {
  version: {
    global: true,
    alias: ['v'],
    type: 'boolean',
    description: 'Show version information',
    coerce: (value: boolean) => {
      if (value) {
        console.log(`${APP_NAME} v${VERSION}`);
        process.exit(0);
      }
      return false;
    },
  } satisfies Options,
};
