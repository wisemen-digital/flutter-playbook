#### [Testing](/testing.md)

# E2E testing

End-to-end (E2E) tests verify complete user flows from start to finish in a real or simulated production environment. They test the entire application as a user would interact with it, including UI interactions, navigation, data persistence, and API calls.

## Why E2E testing?

E2E testing is necessary to validate that the entire system works correctly from the user's perspective. These tests catch issues that only appear when all components work together in a real-world scenario, including UI bugs, navigation problems, and integration issues that unit and integration tests might miss.

However, E2E tests are more expensive to run - they take longer to execute, require more resources, and are more prone to flakiness. Because of this, we focus on testing only the most critical user flows.

## Tooling

We use [Maestro](https://maestro.mobile.dev/) to test full user flows. Maestro provides a simple way to define and run E2E tests across iOS and Android.

## What we E2E test

For now, only the most critical flows are tested to balance test coverage with execution cost and maintenance overhead.
