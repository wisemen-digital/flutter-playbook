#### [Managers](/managers.md)

# Managers

Managers are used for passing navigation or widgets between features. These managers are interfaces that are implemented in the main app so the features do not depend on other features

## Navigation managers

Navigation managers are used when we want to navigate from one screen to another. We divide this into 2 different types of managers:

### External navigation manager

External navigation managers are used for navigating between features. For example from home to a specific detail in another feature. These managers are interfaces in the features and these are implemented in the main app.

```
abstract interface class DogOverviewNavigationManager {
  void navigateToDogDetail();
}
```

```
class DogNavigationManager implements DogOverviewNavigationManager, DogDetailNavigationManager {
  @override
  void navigateToDogDetail() {
    // Push to dog detail screen
  }
}
```

### Internal navigation manager

Internal navigation managers are used for consistency and single responsibility in the widgets. These navigation managers are defined and implemented in the features to navigate from screen to screen within a widget.

```
class DogDetailFeatureNavigationManager {
  const ClubsFeatureNavigationManager(this.router, [this.ref]);
  final StackRouter router;
  final WidgetRef? ref;

  void navigateToPictureGallery() {
    // TODO: Navigate to picture gallery
  }
}
```

## Widget managers

Widget managers are used for displaying widgets from other features inside one. Not every feature has a widget manager because they don't all need one. One example where this is almost always used is the dashboard of an app where this is composed of widgets from other features.

```
abstract interface class DogOverviewWidgetManager {
  Widget getProfilePreview();
}
```

```
class DogWidgetManager implements DogOverviewWidgetManager {
  @override
  Widget getProfilePreview() {
    // Return profile overview widget form Profile feature
  }
}
```