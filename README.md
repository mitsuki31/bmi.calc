# bmi.calc

**bmi.calc** is a [Body Mass Index (BMI)](https://en.wikipedia.org/wiki/Body_mass_index) calculator project consisting of a web application and a command-line interface (CLI), both using the standard **World Health Organization (WHO)** BMI formula.

The project focuses on correctness, simplicity, and reusable core calculation logic shared across applications.

💚 **[Calculate your BMI now!](https://mitsuki31.github.io/bmi.calc/)**

---

## Body Mass Index Formula

BMI is calculated using the global standard formula:

&nbsp; &nbsp; &nbsp; $` BMI = weight\ (kg)\ /\ (height\ (m))^2 `$

**Example:**  
A 60 kg person with height 165 cm (1.65 m) will resulting: **22.04 BMI** (healthy weight)

> [!NOTE]  
> Height values entered in centimeters are internally normalized to meters before calculation.

## Body Mass Index Categories

| Category    | BMI Range   |
| ----------- | ----------- |
| Underweight | < 18.5      |
| Healthy     | 18.5 - 24.9 |
| Overweight  | 25 - 29.9   |
| Obesity     | ≥ 30        |

> [!TIP]  
> In web app, the categories are displayed as sidebar (for desktop).
>
> In CLI app, the categories are displayed as table with colored texts and can be shown using command as below:
>
> ```bash
> bmi categories
> ```

---

## Featured Applications

### Web App

A simple browser-based BMI calculator that allows users to:

- Enter weight in kilograms (kg)
- Enter height in centimeters (cm) or meters (m)
- Instantly calculate BMI
- View BMI categories based on WHO classification

For more details about the web app, [visit here](https://github.com/mitsuki31/bmi.calc/tree/master/apps/web).

### Command-Line App

A lightweight command-line tool designed for quick BMI calculations and scripting:

- Calculate BMI directly from terminal
- Support metric units (centimeters and meters) using `-u` option
- Optional colored output
- JSON output support for automation
- View BMI categories based on WHO classification

For more details about the CLI app, [visit here](https://github.com/mitsuki31/bmi.calc/tree/master/apps/cli).

Need installation guide? [Read here](https://github.com/mitsuki31/bmi.calc/tree/master/apps/cli#installation).

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
┌──────────────┬────────────────────┐
│ Category     │ BMI Range          │
├──────────────┼────────────────────┤
│ Underweight  │ < 18.5             │
│ Healthy      │ 18.5 - 24.9        │
│ *Overweight  │ 25 - 29.9          │
│ Obesity      │ ≥ 30               │
└──────────────┴────────────────────┘
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

## Project Architecture

```
                                     ┌─ CLI-based App
                                     │
              ┌─ Logic Core          │
              │                  <apps/cli>
              │          ┌────  @bmi-calc/cli
       @bmi-calc/core  ──┤
       <packages/core>   └────  @bmi-calc/web
                                 <apps/web>
                                     │
                                     │
                      Web-based App ─┘
```

- [**@bmi-calc/core**][@bmi-calc/core] 🡢 Not an app, but core library. Contains logic core for these two applications.
- [**@bmi-calc/cli**][@bmi-calc/cli] 🡢 A simple command-line interface app to calculate BMI.
- [**@bmi-calc/web**][@bmi-calc/web] 🡢 A web application provides BMI calculation with ease and fast UI response.

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

> [!CAUTION]  
> Specify the `BASE_URL` only if deploying the web app to a subpath (e.g., GitHub Pages).

#### Build All at Once

```bash
bun @all build
```

### Packing Applications

> [!IMPORTANT]  
> The packaging process only applies to [`@bmi-calc/cli`][@bmi-calc/cli]. The web application ([`@bmi-calc/web`][@bmi-calc/web]) is built and bundled separately using **Vue** and **Vite**.

> [!CAUTION]  
> **The script file is still experimental.**

The packaging process is not equivalent to a standard `bun pm pack` execution due to the project’s architecture and custom bundling requirements. Use the provided script instead:

```bash
bun run pack cli --verbose
```

Or:

```bash
bash ./scripts/pack.sh cli --verbose
```

> [!TIP]  
> **Recommended** to always run the script with `--verbose` flag to see what the script is doing.
>
> If you want to know what commands are executed inside the script, you can set `XTRACE=1` before the command.  
> For instance:
>
> ```bash
> XTRACE=1 bun run pack cli --verbose
> ```

<details>
<summary>
  <h4>Why not using <code>bun pm pack</code> or <code>npm pack</code> directly?</h4>
</summary>

In this project architecture, the CLI depends on a locally bundled `core` package instead of pulling it from a registry. Because of this, the normal packing mechanisms (`bun pm pack` or `npm pack`) are not suitable since they are designed for publishing workflows, not for selective in-repo packaging.

The goal of this step is to replicate the behavior of the `files` field in `package.json`, but in reverse: instead of defining what to include during publish time, we remove everything except the required runtime assets. This ensures the bundled core remains minimal while still being fully functional.

This approach is necessary because:

- The core package is consumed as a local dependency during build time
- We only need compiled assets (such as `dist/`, type definitions, and essential metadata)
- Development files (tests, configs, sources, temporary build artifacts) would unnecessarily increase bundle size
- `bun pm pack` / `npm pack` would require creating an intermediate tarball, which does not fit this workflow
- The project uses a custom packaging pipeline rather than a registry-based distribution model

The cleanup logic will restores the `core` package to its original state. Any stashed changes will be applied back after the tarball is created.

</details>

---

### Testing

```bash
bun @all test
```

### Lint with [ESLint](https://eslint.org/)

```bash
bun @all lint
```

### Format using [Prettier](https://prettier.io/)

```bash
bun format
```

---

## License

Licensed under [MIT license](./LICENSE).

<!-- Links -->

[@bmi-calc/core]: https://github.com/mitsuki31/bmi.calc/tree/master/packages/core
[@bmi-calc/cli]: https://github.com/mitsuki31/bmi.calc/tree/master/apps/cli
[@bmi-calc/web]: https://github.com/mitsuki31/bmi.calc/tree/master/apps/web
