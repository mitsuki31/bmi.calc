import { describe, expect, it } from 'vitest';
import { calculateBMI, BMICalculationError } from '../bmi';

describe('calculateBMI', function () {
  it('calculates BMI using meters', function () {
    const bmi = calculateBMI(70, {
      value: 1.75,
      unit: 'm',
    });

    expect(bmi).toBeCloseTo(22.857, 3);
  });

  it('calculates BMI using centimeters', function () {
    const bmi = calculateBMI(70, {
      value: 175,
      unit: 'cm',
    });

    expect(bmi).toBeCloseTo(22.857, 3);
  });

  // Error tests

  it('throws BMICalculationError for non-positive weight', function () {
    expect(() =>
      calculateBMI(0, {
        value: 175,
        unit: 'cm',
      }),
    ).toThrow(BMICalculationError);
  });

  it('throws BMICalculationError for non-positive height', function () {
    expect(() =>
      calculateBMI(70, {
        value: 0,
        unit: 'cm',
      }),
    ).toThrow(BMICalculationError);
  });

  it('includes invalid input values in the error', function () {
    let bmiError: BMICalculationError | null = null;

    try {
      void calculateBMI(-70, { value: 180, unit: 'cm' });
    } catch (err) {
      bmiError = err as BMICalculationError;
    }

    expect(bmiError).toBeInstanceOf(BMICalculationError);
    expect(bmiError?.weightKg).toBe(-70);
    expect(bmiError?.heightM).toBe(1.8);
  });
});
