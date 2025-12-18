# bmi.calc

**bmi.calc** is a simple, focused web application for calculating Body Mass Index (BMI) using the standard **World Health Organization** (WHO) formula.

The web application allows users to:

- Enter weight in kilograms
- Enter height in centimeters or meters
- Instantly calculate BMI
- See the corresponding BMI category based on WHO classification

The goal is clarity and correctness rather than feature abundance.

---

## Formula

BMI is calculated using the global standard formula:

&nbsp; &nbsp; &nbsp; $` BMI = weight\ (kg)\ /\ (height\ (m))^2 `$

**Example:** A 60 kg person with height 165 cm (1.65 m) will resulting: **22.04 BMI**

> [!NOTE]  
> Height values entered in centimeters are internally normalized to meters before calculation.

---

## Development

### Installation

```bash
bun install
```

### For Development

```bash
bun dev
```

### Build for Production

```bash
bun run build
```

It will automatically runs the tests using `bun test`.

### Lint with [ESLint](https://eslint.org/)

```bash
bun lint
```

### Format using Prettier

```bash
bun format
```

---

## License

Licensed under [MIT license](./LICENSE).
