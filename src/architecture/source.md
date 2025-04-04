#### [Architecture](/architecture.md)

# Source

API is the most common source of our data, this could also be a Websocket, Firebase or any other source. We use client services to interact with the data. Then we map the data to a DTO (Data Transfer Object). This is the object this layer will expose.

### DTO

DTOs only use primitive types (`String, int, double, bool, List<T>`) and other DTOs for nested objects. They represent the way we receive data from the data source. Usually annotated with JsonSerializable() to be able to map from and back to json (`Map<String, dynamic>`) objects.

```
@JsonSerializable()
class DogDTO {
  DogDTO({
    required this.uuid,
    required this.name,
    required this.gender,
    required this.media,
    this.birthDate,
  });

  final String uuid;
  final String name;
  final String gender;
  final List<MediaDTO> media;
  final String? birthDate;

  factory DogDTO.fromJson(Map<String, dynamic> json) => _$DogDTOFromJson(json);
  Map<String, dynamic> toJson() => _$DogDTOToJson(this);
}
```

### Services

In a service we query the data source and return the result as a DTO. We expose our services to repositories through Riverpod auto dispose providers.

```
class DogService {
  const DogService(this.ref)
  final Ref ref;

  Future<List<DogDTO>> getDogs() {
    final result = await ref.read(client).function(); // This has not been implemented to demonstrate this data can come from anywhere, Be it an API, Firebase or Bluetooth
    return (results as List<dynamic>).map((dogJson) => DogDTO.fromJson(dogJson)).toList();
  }

  Future<DogDTO> getDog({required String uuid}) {
    final result = await ref.read(client).function(uuid);
    return DogDTO.fromJson(result);
  }
}

final dogServiceProvider = Provider.autoDispose<DogService>((ref) => DogService(ref));
```

### Clients

The clients give us a way to interact with our source (eg. WiseClient, websocket client). Our services can consume them through Riverpod providers.