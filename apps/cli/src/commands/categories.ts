import { categoriesBuilder } from './builders/categories.js';
import { categoriesHandler } from './handlers/categories.js';

export default {
  command: 'categories',
  aliases: ['class', 'category'],
  describe: 'Show all BMI categories',
  builder: categoriesBuilder,
  handler: categoriesHandler,
};
