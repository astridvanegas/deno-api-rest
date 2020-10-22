# Deno MongoDB API

## Requirement

1. Use Deno v1.3.0
2. Install Mongo DB

## Installation

1. Clone the repository
2. Add those keys in .env file (root folder)

MONGO_URI='mongodb://127.0.0.1:27017/movies'
MONGO_DB='movies

3. Start the server by running `deno run --allow-env --allow-net --unstable --allow-read --allow-write --allow-plugin  main.ts`

## Usage
Use [http://localhost:8000](http://localhost:8000)


| METHOD | URL          | Description         |
|--------|--------------|---------------------|
| GET    | /            | Welcome API         |
| GET    | /movies      | Return all movies   |
| GET    | /movies/:id  | Return single movie |
| POST   | /movies      | Create a movie      |
| PATCH  | /movies/:id  | Update movie        |
| DELETE | /movies/:id  | Delete movie        |