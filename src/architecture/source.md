#### [Architecture](/architecture.md)

# Source

API is the most common source of our data, this could also be a Websocket, Firebase or any other source. We use client services to interact with the data. Then we map the data to a DTO (Data Transfer Object). This is the object our other layers will consume.

TODO: Examples