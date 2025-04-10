#### [Architecture](/theming.md)

# Theming

We access our theme through these extensions. It shortens the syntax a little and is just generally nicer to use.

```
extension AppThemeColorExtension on BuildContext {
  //* General theme
  Color get primary => colorScheme.primary;
  Color get shadow => colorScheme.secondary;
  Color get light => colorScheme.surface;
  ...
  //* Const colors
  Color get error => colorScheme.error;
  Color get success => colorScheme.tertiary;
  Color get warning => colorScheme.onTertiary;
}

extension TextStyleExtension on BuildContext {
  TextStyle get normal => AppStyles.normal.copyWith(
        color: this.onLight,
      );
  TextStyle get subtitle => AppStyles.normal.copyWith(
        color: this.grey,
        fontSize: 15,
      );
  ...
}
```

### Colors

Since we use a MaterialApp as App Widget, our underlying theme will be a MaterialTheme. Our designers will supply the colors used in _AppColors, these will be used throughout the themes.

```
class AppTheme {
  static ThemeData baseTheme = ThemeData(
    useMaterial3: true,
    fontFamily: PlatformUtils.isIos ? 'CupertinoSystemDisplay' : 'RobotoFlex',
    splashFactory: PlatformUtils.isIos ? NoSplash.splashFactory : null,
  );

  //* Dark theme
  static ThemeData darkTheme(ThemeType themeType) => baseTheme.copyWith(
        brightness: Brightness.dark,
        colorScheme: darkColorScheme(themeType),
      );

  static ColorScheme darkColorScheme() => ColorScheme.dark(
        //* Primary
        primary: _AppColors.primaryDark,
        ...
      );

  //* Light theme
  static ThemeData lightTheme() => baseTheme.copyWith(
        brightness: Brightness.light,
        colorScheme: lightColorScheme(themeType),
      );

  static ColorScheme lightColorScheme() {
    return ColorScheme.light(
      //* Primary
      primary: _AppColors.primary,
      ...
    );
  }
}

class _AppColors {
  //! Light
  //* General
  static const primary = Colors.amber;

  //! Dark
  //* General
  static const primaryDark = Colors.white;
}
```

