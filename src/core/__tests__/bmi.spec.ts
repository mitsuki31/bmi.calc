import { describe, expect, it } from 'vitest';
import { BMICalculationError, calculateBMI, Category, getCategory } from '../bmi';

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
    expect(bmiError!.weightKg).toBe(-70);
    expect(bmiError!.heightM).toBe(1.8);
  });
});

describe('getCategory', function () {
  it('returns the corresponding category from given BMI result', function () {
    const bmiAndExpectedCategories = {
      '16': Category.UNDERWEIGHT,
      '18.4': Category.UNDERWEIGHT,
      '18.5': Category.HEALTHY,
      '24.8': Category.HEALTHY,
      '24.9': Category.HEALTHY,
      '25': Category.OVERWEIGHT,
      '29.8': Category.OVERWEIGHT,
      '29.9': Category.OVERWEIGHT,
      '30': Category.OBESITY,
      '100': Category.OBESITY,
    };

    for (const [bmi, category] of Object.entries(bmiAndExpectedCategories)) {
      expect(getCategory(Number.parseFloat(bmi))).toStrictEqual(category);
    }
  });

  it('does not throw but returns OBESITY when the input is Infinity or NaN', function () {
    expect(getCategory(NaN)).toStrictEqual(Category.OBESITY);
    expect(getCategory(Infinity)).toStrictEqual(Category.OBESITY);
  });

  it('does not throw but returns UNDERWEIGHT when the input is non-positive number', function () {
    expect(getCategory(0)).toStrictEqual(Category.UNDERWEIGHT);
    expect(getCategory(-1)).toStrictEqual(Category.UNDERWEIGHT);
    expect(getCategory(-Infinity)).toStrictEqual(Category.UNDERWEIGHT);
  });
});
