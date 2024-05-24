# playwright_ts_sample

This repository contains a sample test project using Playwright with TypeScript.

## Available Commands

Inside this directory, you can run several commands:

- `npx playwright test`
  - Runs the end-to-end tests.

- `npx playwright test --ui`
  - Starts the interactive UI mode.

- `npx playwright test --project=chromium`
  - Runs the tests only on Desktop Chrome.

- `npx playwright test example`
  - Runs the tests in a specific file.

- `npx playwright test --debug`
  - Runs the tests in debug mode.

- `npx playwright codegen`
  - Auto-generates tests with Codegen.

## Getting Started

We suggest that you begin by running:

```sh
npx playwright test
```

## Key Files to Explore

- `./tests/example.spec.ts`
  - Example end-to-end test.

- `./tests-examples/demo-todo-app.spec.ts`
  - Demo Todo App end-to-end tests.

- `./playwright.config.ts`
  - Playwright Test configuration.

For more information, visit the [Playwright documentation](https://playwright.dev/docs/intro).