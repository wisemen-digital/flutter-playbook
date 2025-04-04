#### [Architecture](/architecture.md)

# Database

Since we mostly make mobile apps, we want people to be able to use our apps on the go (offline). The app will also feel quicker since most once we fetch our data, we can read the previously fetched data from our database.

### Tables

The most important thing to consider for a table is how your feature will use its data. We don't want to save a bunch of data we're never going to use. The same way we don't want to nest an object 3 objects deep when we only need its name. Since [drift](https://pub.dev/packages/drift) uses SQLite under the hood these tables can only save a certain amount of types. In general we try to use common sense to justify what we save and how we do it. But when in doubt:

Nested Objects:
- Have their own table => Link to that table (using id or link table)
- Only used in this table => Converter
Enums:
- IntColumn using the enum

```
@DataClassName('DogObject')
class DogTable extends Table {
  TextColumn get uuid => text()();
  TextColumn get name => text()();
  IntColumn get gender => intEnum<Gender>()();
  DateTimeColumn get birthDate => dateTime().nullable()();
  TextColumn get media => text().map(Media.converter)();

  @override
  Set<Column> get primaryKey => {uuid};
}
```

### DAO (Data Access Object)

We use a SQLite database that we query using [drift](https://pub.dev/packages/drift). These queries reside in our daos, transactions from and to our database happen through these. We perform pretty basic CRUD in a dao, in which we receive table companion objects and emit table objects.

```
@DriftAccessor(tables: [DogTable])
class DogDao extends DatabaseAccessor<Database> with _$DogDaoMixin {
  Future<void> insertDogs({
    required Iterable<DogTableCompanion> dogs,
  }) async {
    await batch((batch) => batch.insertAllOnConflictUpdate(dogTable, dogs));
    _deleteOldDogs(dogCompanions);
  }

  Future<void> insertDog({
    required DogTableCompanion dog,
  }) async {
    await into(dogTable).insertOnConflictUpdate(dog);
  }

  Stream<List<DogObject>> getDogsStream() => (select(dogTable)..orderBy([(tbl) => OrderingTerm(expression: tbl.name)])).watch();

  Future<void> _deleteOldDogs(Iterable<DogTableCompanion> newDogs) async {
    final newDogIDs = newDogs.map((dog) => dog.id.value);
    await (delete(dogTable)..where((tbl) => tbl.id.isNotIn(newDogIDs))).go();
  }

  Stream<DogObject> getDogStream(String uuid) => (select(dogTable)
        ..where((tbl) => tbl.uuid.equals(uuid))
        ..limit(1))
      .watchSingleOrNull();
}
```

### Models

It's possible for the DAOs to return models instead of table objects for example when multiple tables have to combined into one single model.