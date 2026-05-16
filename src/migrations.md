# Migrations

### Wiseclient v1 to v2

Fresh updates made the custom fork we were running redundant, so these fields moved back to supporting default fresh and fresh_dio.
V2 also came with the new stable release of flutter_secure_storage. We need to run a migration to change its accessability mode from default to first unlocked. This function should be run in main.dart before app start. This can be adjusted to not need the await for shared prefs.

```dart
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:wiseclient/src/secure_token_storage/fresh_secure_token_storage.dart';
import 'package:wiseclient/src/secure_token_storage/token_from_string_extension.dart';

const _tokensMigratedKey = 'tokensMigrated';
const _oldTokenKey = 'OAUTH_TOKEN'; // v1 client token path

Future<void> migrateTokens() async {
  final sharedPreferences = await SharedPreferences.getInstance();
  if (sharedPreferences.getBool(_tokensMigratedKey) ?? false) {
    return;
  }
  const oldSecureStorage = FlutterSecureStorage();
  if (await oldSecureStorage.containsKey(key: _oldTokenKey)) {
    final tokenString = await oldSecureStorage.read(key: _oldTokenKey);
    if (tokenString != null) {
      final token = tokenString.toOAuthToken;
      final newTokenStorage = FreshSecureTokenStorage();
      await Future.wait([
        newTokenStorage.write(token),
        sharedPreferences.setBool(_tokensMigratedKey, true),
      ]);
      //* Only clean after successful writes
      await oldSecureStorage.delete(key: _oldTokenKey);
    }
  }
}
```
