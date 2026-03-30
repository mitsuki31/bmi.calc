# @bmi-calc/web

Modern web interface for the BMI Calculator project.

Built with:

- Vue 3
- Vite
- TailwindCSS
- TypeScript

This package provides an interactive UI that consumes the core calculation engine.

> [!NOTE]\
> This is a **part of [bmi.calc](https://github.com/mitsuki31/bmi.calc) monorepo.**

## Features

- Interactive BMI calculator
- Clean responsive layout
- Fast Vite build
- Dark modern UI
- Unit support

## Development

> [!TIP]\
> If you're inside the `/apps/web` directory, simply replace the `bun @web` with `bun run`.

Install dependencies from workspace root:

```bash
bun install
```

Run development server:

```bash
bun @web dev
```

Build:

```bash
bun @web build
```

Preview:

```bash
bun @web preview
```

## Architecture

This app depends on [`@bmi-calc/core`](https://github.com/mitsuki31/bmi.calc/tree/master/packages/core)

All calculation logic is delegated to the core package.

UI only handles:

- Input handling
- Validation
- Display
- UX behavior

## Project Structure

```
web/
├── src/
│   ├── components/
│   │   ├── ...
│   │   └── layout/
│   │       └── BMICalculator.vue
│   ├── hooks/
│   │   └── ...
│   ├── styles/
│   │   └── ...
│   │
│   ├── App.vue
│   └── main.ts
│
│   ...
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## License

[MIT License](../../LICENSE)
