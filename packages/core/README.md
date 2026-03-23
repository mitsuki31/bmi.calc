# @bmi-calc/core

Core calculation engine for the BMI Calculator ecosystem.  
This package contains pure logic without UI or runtime dependencies.

It is designed to be reusable across:

- Web application
- CLI application

## Features

- BMI calculation
- BMI classification
- Unit conversion support
- Zero UI dependencies
- Fully testable pure functions

## Usage

```typescript
import { calculateBMI, getCategory } from '@bmi-calc/core';

const bmi = calculateBMI(70, {
  value: 170,
  unit: 'cm',
});
const category = getCategory(bmi);

console.log(bmi); // 24.22
console.log(category); // Category.Healthy
```

## API

### `calculateBMI()`

Computes BMI from weight and height.

```typescript
calculateBMI(weightKg: number, height: {
  value: number;
  unit: "m" | "cm"
}): number
```

### `getCategory()`

Returns BMI classification.

```typescript
getCategory(bmi: number): Category
```

### `Category`

An enum represents BMI classification categories based on the **World Health Organization (WHO)** standard Body Mass Index (BMI) ranges.

```typescript
enum Category {
  UNDERWEIGHT = 'underweight',
  HEALTHY = 'healthy',
  OVERWEIGHT = 'overweight',
  OBESITY = 'obesity',
}
```

## Package Structure

```
core/
├── src/
│   ├── __tests__/
│   │   └── bmi.spec.ts
│   ├── bmi.ts
│   ├── error.ts
│   └── index.ts
│
├── package.json
├── tsconfig.json
└── README.md
```

## Design Principles

This package follows strict separation rules:

- No UI logic
- No framework dependencies
- No CLI logic
- Only deterministic functions

## Testing

Run using [Bun](https://bun.sh/) test runner:

```bash
bun test
```

Run using [Vitest](https://vitest.dev/):

```bash
bun run -b test
```

## License

[MIT License](../../LICENSE)
