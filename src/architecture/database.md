#### [Architecture](/architecture.md)

# Database

Since we mostly make mobile apps, we want people to be able to use our apps on the go (offline). The app will also feel quicker since most once we fetch our data, we can read the previously fetched data from our database.

### DAO (Data Access Object)

We use a SQLite database that we query using [drift](https://pub.dev/packages/drift). These queries reside in our daos, transactions from and to our database happen through these. We perform pretty basic CRUD in a dao, in which we receive table companion objects and emit table objects.

TODO: Examples