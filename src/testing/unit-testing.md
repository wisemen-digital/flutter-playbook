#### [Testing](/testing.md)

# Unit testing

Unit tests verify individual functions, methods, or classes in isolation. They test the smallest testable parts of your code to ensure they behave correctly under various conditions.

## Why unit testing?

Unit testing is necessary to catch bugs early, maintain code quality, and ensure refactoring doesn't break existing functionality. It's the fastest way developers can get feedback on their code - unit tests run in milliseconds and can be executed continuously during development.

We run unit tests on every pull request to main to ensure all code is tested before merging.

## What we unit test

### Repository

Test repository logic while mocking the underlying data sources (network, database). This isolates the repository layer and verifies data transformation, caching logic, and error handling without depending on actual API calls or database operations.

### Providers

Test providers that manipulate or transform data. Focus on providers with business logic rather than simple state holders.

### Navigation Manager

Test navigation managers where extra logic is added (e.g., conditional routing, authentication checks). Verify the expected route is returned based on the current navigation stack state.

## Resources

- [Flutter Unit Testing Guide](https://docs.flutter.dev/cookbook/testing/unit/introduction)
