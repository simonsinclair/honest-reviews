# Honest Reviews

Discover the best products.

## Setup

### Prerequisites

- Git

```sh
git clone https://github.com/simonsinclair/honest-reviews.git
cd honest-reviews
```

## Running

### Production

#### Prerequisites

- [Setup](#setup)
- Docker

```sh
docker build --tag honest-reviews .
docker run --name honest-reviews --publish 3000:3000 honest-reviews
```

The application will be available at http://localhost:3000.

##### :octocat: To seed the production database, run:

```sh
docker exec honest-reviews npx prisma db seed
```

_Note: This can be run as many times as you like._

### Development

#### Prerequisites

- [Setup](#setup)
- Node.js: >=14
  1. `cp .env.example .env` to create an `.env` file. See [Environment variables](#environment-variables).
  2. `npm i` to install package dependencies.
  3. `npm run dev:init` to create and seed the database.

```sh
npm run dev
```

The application will be available at http://localhost:3000.

## Testing

## Routes

| Route                       | Comments                                                                                                                                    |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                         | Redirects to `/products` (the current homepage). This gives us room to have a root homepage in future.                                      |
| `/products`                 | The product index.                                                                                                                          |
| `/products/$id`             | The product (identified by `$id`) page – also where the product's reviews live.                                                             |
| `/products/$id/reviews`     | Redirects to `/products/$id#reviews`. A vanity URL to improve the experience of people querying the visible URL structure. See route below. |
| `/products/$id/reviews/new` | The review form for the product identified by `$id`.                                                                                        |

## Environment variables

### `DATABASE_URL`

We use Prisma – a type-safe ORM with support for the following databases: PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, and CockroachDB.

Our current database is SQLite (as defined by the default `DATABASE_URL` found in [.env.example](.env.example)). To use another supported relational database, update this value.

#### For example

To use a PostgreSQL database, your `.env` file might contain the following:

```sh
DATABASE_URL="postgresql://test:test@localhost:5432/test?schema=public"
```

## Improvements

- The rating's trend chart assumes we have a least one rating for every day. In practice, this may not be the case. As an improvement, we should fill gaps in rating data with the last known 'good' data. For example [2, 3, null, 4] => [2, 3, 3, 4].
