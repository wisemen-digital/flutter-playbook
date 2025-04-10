#### [Architecture](/architecture.md)

# Repository

Our features are app agnostic. All they know is that they're reading and writing data from a repository that will be implemented somewhere. This makes our repositories the true driving force behind content.

### DTO Mapper

DTO mappers are used to map the DTOs received from the network layer to their corresponding database companions. We use companions because they allow for easier data upserts.

```
extension DogDTOMapper on DogDTO {
  DogTableCompanion toDBCompanion() {
    return DogTableCompanion(
      uuid: Value(uuid),
      name: Value(name),
      gender: Value(Gender.fromJson(gender)),
      birthDate: birthDate == null ? const Value.absent() : Value(birthDate), // Upsert of birthday because this is not passed in all calls
      media: Value(media.map((media) => media.toAppModel()).toList()),
    );
  }
}
```

### Table Object mappers

Table object mappers are used for mapping the table object to feature models. These feature models only define the data that they need according to their UI.

```
extension DogMapper on DogObject {
  DogOverviewModel toOverviewFeatureModel() {
    // Notice not all values are passed, not needed in this instance
    return DogOverviewModel(
      uuid: uuid,
      name: name,
      mainThumbnailUrl: media.firstOrNull?.thumbnailUrl,
    );
  }

  DogDetailModel toDetailFeatureModel() {
    return DogDetailModel(
      uuid: uuid,
      name: name,
      birthDate: birthDate,
      gender: gender.toFeatureModel(),
      imageUrls: media.map((media) => media.imageUrl).toList(),
    );
  }
}
```

### Repository Implementation

Features define each of their functionality via interfaces. The the repo's implement these interfaces to ensure the features can use their desired functions.
The repositories use the services and DAO's to provide the features with the functionalities they need.
Please note: the repositories can also define other (helper) methods.

```
class DogRepositoryImpl implements DogOverviewRepository, DogDetailRepository {
  @override
  Future<void> refreshDogs() async {
    try {
      final dogs = await DogService().getDogs();

      await ref.read(dogDaoProvider).insertDogs(dogs);
    } catch (e) {
      rethrow;
    }
  }

  @override
  Stream<List<DogOverviewModel>> getDogsStream() {
    return ref.read(dogDaoProvider).getDogsStream().map((list) => list.map((dog) => dog.toOverviewFeatureModel()));
  }

  @override
  Future<void> refreshDogDetail(String dogID) async {
    try {
      final dog = await DogService().getDog(dogID);

      await ref.read(dogDaoProvider).insertDog(dog);
    } catch (e) {
      rethrow;
    }
  }

  @override
  Stream<DogDetailModel> getDogDetailStream(String dogID) {
    return ref.read(dogDaoProvider).getDogStream(dogID).map((dog) => dog.toDetailFeatureModel());
  }
}
```