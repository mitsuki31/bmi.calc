/**
 * Height representation used for BMI calculation.
 *
 * The unit must be explicitly specified to avoid ambiguity.
 * Automatic unit detection is intentionally not supported.
 *
 * - `"m"`  : height in meters
 * - `"cm"` : height in centimeters
 */
export type Height = { value: number; unit: 'm' } | { value: number; unit: 'cm' };

/**
 * BMI classification categories based on the **World Health Organization (WHO)**
 * standard Body Mass Index (BMI) ranges.
 *
 * These categories are intentionally defined as string enums to ensure
 * stable, human-readable values when used across multiple environments
 * (web UI, CLI output, logs, or serialized data).
 */
export enum Category {
  /** BMI ≤ 18.4 */
  UNDERWEIGHT = 'underweight',
  /** BMI between 18.5 and 24.9 */
  HEALTHY = 'healthy',
  /** BMI between 25.0 and 29.9 */
  OVERWEIGHT = 'overweight',
  /** BMI ≥ 30.0 */
  OBESITY = 'obesity',
}

/**
 * Calculates Body Mass Index (BMI) using the standard global formula.
 *
 * ### Formula
 *
 * BMI is defined by the **World Health Organization (WHO)** as:
 *```txt
 *     BMI = weight (kg) / (height (m))²
 *```
 * If the height is provided in centimeters, it is converted to meters
 * internally before applying the formula.
 *
 * **Reference:** [Body Mass Index | World Health Organization (WHO)](https://www.who.int/data/gho/data/themes/theme-details/GHO/body-mass-index-(bmi))
 *
 * @param weightKg - The body weight in kilograms. Must be a positive number.
 *
 * @param height - The height object containing a numeric value and its unit (`"m"` or `"cm"`).
 *                 Height must be greater than zero after unit conversion.
 *
 * @returns A numeric BMI value. The result is not rounded and should be formatted by the caller
 *          depending on presentation requirements.
 *
 * @throws {@link BMICalculationError} - Throw the error if any condition below is true:
 * - `weightKg` is less than or equal to zero
 * - `height` value is less than or equal to zero
 */
export function calculateBMI(weightKg: number, height: Height): number {
  const heightM = height.unit === 'cm' ? height.value / 100 : height.value;

  if (!Number.isFinite(weightKg) || weightKg <= 0) {
    throw new BMICalculationError('Weight must be a positive number', weightKg, heightM);
  }

  if (!Number.isFinite(heightM) || heightM <= 0) {
    throw new BMICalculationError('Height must be a positive number', weightKg, heightM);
  }

  return weightKg / heightM ** 2;
}

/**
 * Determines the BMI category for a given BMI value.
 *
 * The classification follows the standard WHO BMI thresholds:
 *
 * - < 18.5  → **Underweight**
 * - 18.5–24.9 → **Healthy**
 * - 25.0–29.9 → **Overweight**
 * - ≥ 30.0  → **Obesity**
 *
 * @remarks
 * This function assumes the input BMI value has already been validated.
 * It does not perform `NaN`, `Infinity`, or range checks and should be used
 * only with trusted calculation results (e.g., output of {@link calculateBMI}).
 *
 * @param bmi - A Body Mass Index (BMI) value. Must be a finite, positive number.
 * @returns The corresponding {@link Category}.
 *
 * @example
 * ```ts
 * getCategory(22.3); // Category.HEALTHY
 * getCategory(31.1); // Category.OBESITY
 * ```
 */
export function getCategory(bmi: number): Category {
  if (bmi < 18.5) return Category.UNDERWEIGHT;
  if (bmi < 25.0) return Category.HEALTHY;
  if (bmi < 30.0) return Category.OVERWEIGHT;
  return Category.OBESITY;
}

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
