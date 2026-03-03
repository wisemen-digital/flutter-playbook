#### [Testing](/testing.md)

# Integration testing

Integration tests verify that multiple parts of your app work together correctly. They test the interactions between different components, layers, and modules to ensure they integrate properly as a system.

## Why integration testing?

Integration testing is necessary to catch issues that only appear when components interact with each other. While unit tests verify individual pieces work in isolation, integration tests ensure those pieces work together correctly. They validate data flow between layers, API integrations, database operations, and other cross-component interactions.

We run integration tests on every pull request to main to ensure all integrated components work together before merging.

## What we integration test

### Accessibility

Test accessibility per screen to ensure the app is usable for everyone. This includes:
- Minimum tap size requirements
- Color contrast ratios
- Semantic labels for screen readers
- Localization support across all languages

### Navigation Manager Calls

Verify that the correct navigation manager calls are executed during user flows and screen transitions.

### Fake Client

Create a fake client to mock network responses for integration tests. This fake client simulates API behavior without requiring actual network calls. The fake client itself should also be tested to ensure it accurately represents the real API.

### Fake Service

Create an interface of the service for network calls so we can provide different implementations (real service for production, fake service for integration tests). The fake service uses the fake client to return predefined responses, allowing integration tests to run without real network dependencies while still testing the full data flow through the service layer.

## Resources

- [Flutter Integration Testing Guide](https://docs.flutter.dev/cookbook/testing/integration/introduction)
