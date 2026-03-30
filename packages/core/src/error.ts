/**
 * Error thrown when BMI calculation fails due to invalid input values.
 *
 * ### When this error is thrown
 *
 * A `BMICalculationError` is thrown when:
 * - `weightKg` is not a finite positive number
 * - height (after unit conversion) is not a finite positive number
 *
 * #### Purpose
 *
 * This error exists to:
 * - Distinguish input validation failures from unexpected runtime errors
 * - Preserve the invalid input values for debugging and user feedback
 * - Allow consumers (UI or CLI) to present meaningful error messages
 *
 * #### Usage
 *
 * Consumers are expected to catch this error explicitly and handle it
 * as a user-facing validation issue.
 *
 * @example
 * ```ts
 * try {
 *   calculateBMI(0, { value: 170, unit: "cm" });  // throws
 * } catch (err) {
 *   if (err instanceof BMICalculationError) {
 *     console.error(err.message);
 *   }
 * }
 * ```
 */
export class BMICalculationError extends Error {
  /**
   * The weight value (in kilograms).
   */
  public readonly weightKg: number;
  /**
   * The height value (in meters) after unit conversion.
   */
  public readonly heightM: number;

  constructor(message: string, weightKg: number, heightM: number) {
    super(message);
    this.name = 'BMICalculationError';
    this.weightKg = weightKg;
    this.heightM = heightM;
  }
}
