#### [Architecture](/architecture.md)

# Feature

As mentioned in repository, our features are app agnostic. They're like a plug and play concept that fits into every app that needs them. They get their data from repositories.

### Structure

```
- example
    - controllers
        - example_controller.dart
        - controllers.dart
    - managers
        - feature_navigation_manager.dart
        - managers.dart
        - navigation_manager.dart
        - widget_manager.dart
    - models
        - example.dart
        - models.dart
    - providers
        - example_providers.dart
        - providers.dart
    - repositories
        - example_repository.dart
        - repositories.dart
    - screens
        - example_screen.dart
        - screens.dart
    - widgets
        - widgets.dart
    - example_feature.dart
    - example.dart
```

### Managers/Repositories

A feature uses interfaces for communication with other features or layers of the app. These are pretty straight forward and always have the same structure:

```
abstract interface class FeatureInterfaceName {
  <return type> functionName();
}
```

### Providers

For bigger features we make a division between controller providers and data providers. A controller's usual purpose is to update our source's data. Let's say we can change our user's information through a save button. Our controller would control the repository call that saves that data and the state of the button/error.

```
@riverpod
class ExampleController extends _$ExampleController {
  @override
  FutureOr<dynamic> build() async {
    listenSelf(
      (previous, next) {
        if (next.hasError && !next.isLoading) {
          ErrorUtils.showAsyncError(next);
        }
      },
    );
    return null;
  }

  Future<void> functionName() async {
    state = const AsyncValue.loading();
    try {
      await ref
          .read(ExampleFeature.exampleRepository)
          .doFunction();
      state = const AsyncValue.data(null);
    } catch (error, stackTrace) {
      state = AsyncValue.error(error, stackTrace);
      LogErrorUtil.logError(error, stackTrace);
    }
  }
}
```

Our data providers provide our widgets with the data that they display. This is usually data from streams in our database, but can have other sources too. This is one example of stream provider with refresh using LoadingStreamProvider.

```
@riverpod
class ClubDetailProvider extends _$ClubDetailProvider with LoadingStreamProvider<ClubDetail?> {
  @override
  Stream<ClubDetail?> build(String exampleId) {
    refresh();
    return ref.watch(ExampleFeature.exampleRepository).watchExample(exampleId);
  }

  @override
  Future<void> onError(Object error, StackTrace stackTrace) async {
    LogErrorUtil.logError(error, stackTrace);
  }

  @override
  Future<void> refreshFunction() async {
    await ref.read(ExampleFeature.exampleRepository).refreshExample(exampleId);
  }
}
```

### Models

Each feature also has its own models. They supply our UI with data with whichever type of data they need. The feature doesn't map these models at any time. 
