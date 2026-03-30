# bmi.calc

**bmi.calc** is a [Body Mass Index (BMI)](https://en.wikipedia.org/wiki/Body_mass_index) calculator project consisting of a web application and a command-line interface (CLI), both using the standard **World Health Organization (WHO)** BMI formula.

The project focuses on correctness, simplicity, and reusable core calculation logic shared across applications.

💚 **[Calculate your BMI now!](https://mitsuki31.github.io/bmi.calc/)**

---

## Body Mass Index Formula

BMI is calculated using the global standard formula:

&nbsp; &nbsp; &nbsp; $` BMI = weight\ (kg)\ /\ (height\ (m))^2 `$

**Example:**\
A 60 kg person with height 165 cm (1.65 m) will resulting: **22.04 BMI**

> [!NOTE]  
> Height values entered in centimeters are internally normalized to meters before calculation.

---

## Featured Applications

### Web App

A simple browser-based BMI calculator that allows users to:

- Enter weight in kilograms (kg)
- Enter height in centimeters (cm) or meters (m)
- Instantly calculate BMI
- View BMI categories based on WHO classification

For more details about the web app, [see here](https://github.com/mitsuki31/bmi.calc/tree/master/apps/web).

### Command Line App

A lightweight command-line tool designed for quick BMI calculations and scripting:

- Calculate BMI directly from terminal
- Support metric units (centimeters and meters) using `-u` option
- Optional colored output
- JSON output support for automation
- View BMI categories based on WHO classification

For more details about the CLI app, [see here](https://github.com/mitsuki31/bmi.calc/tree/master/apps/cli).

<details>
<summary><strong>See examples</strong></summary>

```bash
bmi calc 80 175
# OR:
bmi -w 80 -h 175
```

**Output:**

```
 BMI Result
 ──────────
┌──────────┬────────────────────┐
│ BMI      │ Category           │
├──────────┼────────────────────┤
│ 26.12    │ Overweight         │
└──────────┴────────────────────┘

 BMI Classification
 ──────────────────
┌─────────────┬────────────────────┐
│ Category    │ BMI Range          │
├─────────────┼────────────────────┤
│ Underweight │ < 18.5             │
│ Healthy     │ 18.5 - 24.9        │
│ Overweight  │ 25 - 29.9          │
│ Obesity     │ ≥ 30               │
└─────────────┴────────────────────┘
```

---

Result in JSON format:

```bash
bmi calc 80 175 --json
```

**Output:**

```json
{
  "bmi": "26.12",
  "category": "Overweight"
}
```

</details>

---

## Project Structure

```
.
├── apps/  --> applications
│   │
│   ├── cli/  --> CLI-based app
│   │   ├── ...
│   │   ├── package.json
│   │   ├── README.md
│   │   └── tsconfig.json
│   │
│   └── web/  --> web-based app
│       ├── ...
│       ├── package.json
│       ├── README.md
│       └── tsconfig.json
│
├── packages/
│   └── core/  --> core calculation logic
│       ├── ...
│       ├── package.json
│       ├── README.md
│       └── tsconfig.json
│
├── LICENSE
├── package.json
└── README.md
```

---

## Development

### Installation

```bash
bun install
```

### Build Apps

#### Build CLI App

```bash
bun @cli build
```

#### Build Web App

Build for Development:

```bash
bun @web build
```

Build for Production:

```bash
BASE_URL="/bmi.calc/" bun @web build
```

> [!CAUTION]\
> Specify the `BASE_URL` only if deploying the web app to a subpath (e.g., GitHub Pages).

#### Build All at Once

```bash
bun @all build
```

### Testing

```bash
bun @all test
```

### Lint with [ESLint](https://eslint.org/)

```bash
bun @all lint
```

### Format using Prettier

```bash
bun format
```

---

## License

Licensed under [MIT license](./LICENSE).
