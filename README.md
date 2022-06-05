# Honest Reviews

Honest product reviews to help buyers make the best purchase decisions.

## Setup

### Prerequisites

1. Git

```sh
git clone https://github.com/simonsinclair/honest-reviews.git
cd honest-reviews
```

## Running

### Production

Run a production version of the Honest Reviews application from a Docker container exposed at http://localhost:3000.

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

_Note: The seed script will create a new product and accompanying user reviews. It is idempotent and can be run as many times as required._

### Development

Run the Honest Reviews application in development mode at http://localhost:3000.

#### Prerequisites

1. [Setup](#setup)
2. Node.js: `>=14`
3. `npm i` to install package dependencies.
4. `cp .env.example .env` to create an `.env` file. See [Environment variables](#environment-variables).
5. `npm run dev:init` to create, migrate, and seed the database.

```sh
npm run dev
```

### Automated tests

Run the Honest Reviews application test suite all together or individiually by type.

#### Prerequisites

1. All [Development Prequisites](#prerequisites-2).
2. `npx playwright install` to install browser binaries required by Playwright E2E tests.

### All together ([Static](#static), [Unit](#unit), and [E2E](#e2e))

```sh
npm test
```

### Static

Analyse all application code for formatting, linting, and type errors.

```sh
npm run test:static
```

### Unit

Verify isolated parts of the application, such as React components, work as expected.

```sh
npm run test:unit
```

#### :octocat: See a coverage report by running `npm run test:unit:coverage`.

### E2E

Verify critical user flows, such as posting a product review, work as expected.

```sh
npm run test:e2e
```

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

## Future

### Rating trend data

The rating trend chart is based on a 30-Day Simple Moving Average, which assumes there is at least one rating for every day. In practice, this may not be the case. For days where there are no reviews, we should carry over the previous day's rating.

#### I.E.

```ts
[2, 3, null, 4] => [2, 3, 3, 4].
```

### User authentication

A user is currently identified by their email address, and without authentication it's possible for users to imitate other users. In practice, this means User A (user-a@gmail.com) can post a review as User B (user-b@gmail.com) by filling in the review form inaccurately. In order to prevent this, users must verify their identity.
