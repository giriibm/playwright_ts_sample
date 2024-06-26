# playwright_ts_sample

This repository contains a sample test project using Playwright with TypeScript.

## Check NodeJS and NPM installed
- `node -v`
  - Check the nodejs version 

- `npm -v`
  - Check the npm version 

## Getting Started

Installing Playwright

```sh
npm init playwright@latest
```

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

## HTML Report

To open last HTML report run:

```sh
npx playwright show-report
```


## Key Files to Explore

- `./src/tests/e2e/example.spec.ts`
  - Example end-to-end test.
  
- `./playwright.config.ts`
  - Playwright Test configuration.

For more information, visit the [Playwright documentation](https://playwright.dev/docs/intro).

![Playwright Template](./screenshots/playwright-ts-sample.png?raw=true "Playwright Template")

