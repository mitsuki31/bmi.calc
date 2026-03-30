import { bmiBuilder } from './builders/bmi.js';
import { bmiHandler } from './handlers/bmi.js';

export default {
  command: '$0 [options]',
  describe: 'Calculate BMI',
  builder: bmiBuilder,
  handler: bmiHandler,
};
