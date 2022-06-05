# Honest Reviews

Discover the best products.

## Setup

### Prerequisites

1. Git

```sh
git clone https://github.com/simonsinclair/honest-reviews.git
cd honest-reviews
```

## Running

### Production

Run Honest Reviews from a Docker container exposed at http://localhost:3000.

#### Prerequisites

1. [Setup](#setup)
2. Docker

```sh
docker build --tag honest-reviews .
docker run --name honest-reviews --publish 3000:3000 honest-reviews
```

##### :octocat: To seed the production database, run:

```sh
docker exec honest-reviews npx prisma db seed
```

_Note: The seed script is idempotent and can be run as many times as required._

### Development

Run Honest Reviews in development mode at http://localhost:3000.

#### Prerequisites

1. [Setup](#setup)
2. Node.js: `>=14`
3. `npm i` to install package dependencies.
4. `cp .env.example .env` to create an `.env` file. See [Environment variables](#environment-variables).
5. `npm run dev:init` to create and seed the database.

```sh
npm run dev
```

## Testing

## Routes

| Route                       | Comments                                                                                                                                    |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                         | Redirects to `/products` (the current homepage). This gives us room to have a root homepage in future.                                      |
| `/products`                 | The products page – a listing of all products in the database.                                                                              |
| `/products/$id`             | The product identified by `$id`'s page.                                                                                                     |
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
