import { calcBuilder } from './builders/calc.js';
import { calcHandler } from './handlers/calc.js';

export default {
  command: 'calc <weight> <height>',
  aliases: ['c'],
  describe: 'Calculate BMI directly',
  builder: calcBuilder,
  handler: calcHandler
};
