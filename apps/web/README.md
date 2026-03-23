# @bmi-calc/web

Modern web interface for the BMI Calculator project.

Built with:

- Vue 3
- Vite
- TailwindCSS
- TypeScript
- Vitest

This package provides an interactive UI that consumes the core calculation engine.

## Features

- Interactive BMI calculator
- Clean responsive layout
- Fast Vite build
- Dark modern UI
- Unit support

## Development

Install dependencies from workspace root:

```bash
bun install
```

Run development server:

```bash
bun run -b dev
```

Build:

```bash
bun run -b build
```

Preview:

```bash
bun run -b preview
```

## Architecture

This app depends on [`@bmi-calc/core`](../../packages/core)

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
