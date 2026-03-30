# @bmi-calc/cli

Command line interface for [Body Mass Index (BMI)](https://en.wikipedia.org/wiki/Body_mass_index) calculation.

Provides a fast way to compute BMI directly from the terminal using the shared core engine.

🌠 Don't like terminal? **Check out the website version at [bmi.calc](https://mitsuki31.github.io/bmi.calc/).**

> [!NOTE]\
> This is a **part of [bmi.calc](https://github.com/mitsuki31/bmi.calc) monorepo.**

---

## Features

- Lightweight CLI with `bmi` and `calc` commands
- Flexible unit support (cm and meters)
- Clean terminal output with optional colors
- JSON output mode for automation
- Uses shared core calculation logic

## Usage

```bash
bmi [-w <weight>] [-h <height>] [options]
bmi calc <weight> <height> [options]
```

Example:

```bash
bmi -w 70 -h 170 -u cm
```

Alternative one, but more simpler way to write it:

```bash
bmi calc 70 170
```

Output:

```
 BMI Result
 ──────────
┌──────────┬────────────────────┐
│ BMI      │ Category           │
├──────────┼────────────────────┤
│ 24.22    │ Healthy            │
└──────────┴────────────────────┘

 BMI Classification
 ────────────────────
┌─────────────┬────────────────────┐
│ Category    │ BMI Range          │
├─────────────┼────────────────────┤
│ Underweight │ < 18.5             │
│ Healthy     │ 18.5 - 24.9        │
│ Overweight  │ 25 - 29.9          │
│ Obesity     │ ≥ 30               │
└─────────────┴────────────────────┘
```

<br />

<details>
<summary><strong>Output as JSON</strong></summary>

```bash
bmi calc 70 170 --json
```

Output:

```json
{
  "bmi": 24.22,
  "category": "Healthy"
}
```

---

More example (using `jq` to get BMI value only):

```bash
bmi calc 70 170 --json | jq .bmi --raw-output -
```

Output:

```
24.22
```

</details>

---

## Development

> [!TIP]\
> If you're inside the `/apps/cli` directory, simply replace the `bun @cli` with `bun run`.

Install dependencies from workspace root:

```bash
bun install
```

Build from workspace root:

```bash
bun @cli build
```

## Package Structure

```
cli/
├── src/
│   ├── commands/
│   │   └── builders/
│   ├── config/
│   │   └── ...
│   ├── ui/
│   │   └── ...
│   ├── utils/
│   │   └── ...
│   │
│   ├── index.ts
│   └── main.ts
│
|   ...
├── package.json
├── README.md
└── tsconfig.json
```

## Execution Flow

```
CLI Input
   ↓
Argument Parser
   ↓
@bmi-calc/core
   ↓
Formatted Output
```

## License

[MIT License](../../LICENSE)
