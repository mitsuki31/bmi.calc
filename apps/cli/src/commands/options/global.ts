// Contains global options for bmi-calc

import type { Options } from 'yargs';

// ! MAKE SURE TO ADD `global: true` PROPERTY TO EACH OPTION

export default {
  json: {
    global: true,
    alias: ['J'],
    type: 'boolean',
    description: 'Output result in JSON format',
  } satisfies Options,

  color: {
    global: true,
    type: 'boolean',
    default: true,
    description: 'Enable color output',
    coerce: (value: boolean) => {
      if (!value) return false;
      delete process.env.NO_COLOR;
      return true;
    },
  } satisfies Options,

  'no-color': {
    global: true,
    type: 'boolean',
    description: 'Disable color output',
    coerce: (value: boolean) => {
      if (!value) return false;
      process.env.NO_COLOR = '1';
      return true;
    },
  } satisfies Options,
};
