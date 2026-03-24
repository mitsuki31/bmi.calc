/**
 * Validate if the value is a positive number
 *
 * @param value - The value to validate
 * @param name - The name of the value
 *
 * @returns The `value` if it is a positive number
 * @throws {Error} if the value is not a positive number
 */
export function validatePositiveNumber(value: any, name: string): number {
  if (!(typeof value === 'number' && value > 0)) {
    throw new Error(`${name} must be a positive number`);
  }
  return value;
}
