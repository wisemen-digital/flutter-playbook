#### [Architecture](/architecture.md)

# Layers

We divide our app into clear and separated layers with each their own responsibility and imports. This makes our app data source agnostic and makes big refactors of certain layers not impact the entire app.

![Architecture Layers Diagram](/architecture.png)

## Project structure

Due to code gen limitations (endless build runners) we have two different implementations of this.

### Folder structure

```
- lib
  - database
    - dao
    - database
      - utils
      - database.dart
    - enums (enums saved in DB)
    - models (combined table models)
    - tables
  - features
    - example
      - controllers
      - managers
      - models
      - providers
      - repositories
      - screens
      - widgets
      - example_feature.dart
      - example.dart
    - ...
  - network
    - clients
    - dto
    - services
    - utils
    - network.dart
  - l10n
    - intl_en.arb
    - ...
  - repository
    - example_repository.dart
    - ...
    - repository.dart
  - router
    - guards
    - managers
    - routes
    - app_router_service.dart
    - app_router.dart
    - router.dart
  - theme
    - app_text_styles.dart
    - app_theme.dart
    - assets.dart
    - theme.dart
  - app.dart
  - feature_init_util.dart
  - flavors.dart
  - main.dart
  - main_development.dart
  - ...
```

### Package structure

```
- lib
  - features
    - example
      - controllers
      - managers
      - models
      - providers
      - repositories
      - screens
      - widgets
      - example_feature.dart
      - example.dart
    - ...
  - l10n
    - intl_en.arb
    - ...
  - router
    - guards
    - managers
    - routes
    - app_router_service.dart
    - app_router.dart
    - router.dart
  - theme
    - app_text_styles.dart
    - app_theme.dart
    - assets.dart
    - theme.dart
  - app.dart
  - feature_init_util.dart
  - flavors.dart
  - main.dart
  - main_development.dart
  - ...
- packages
  - database
    - lib
      - src
        - dao
        - database
          - utils
          - database.dart
        - enums (enums saved in DB)
        - models (combined table models)
        - tables
      - database.dart
    - pubspec.yaml
  - network
    - lib
      - src
        - clients
        - dto
        - services
        - utils
      - network.dart
    - pubspec.yaml
  - repository
    - lib
      - src
        - example_repository.dart
        - ...
      - repository.dart
    - pubspec.yaml
```