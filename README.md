# Honest Reviews

## Getting started

### Prerequisites

- Node: >=14

### Setup

```sh
npm install
```

### Running locally

#### Development

```sh
npm run dev
```

##### :octocat: If you're running this for the first time, run `npm run dev:init` to create and seed the database.

#### Production

```sh
npm run build
npm start
```

## Notes

- The rating's trend chart assumes we have a least one rating for every day. In practice, this is not the case. As an improvement, we should fill gaps in rating data with the last known 'good' data. For example [2, 3, null, 4] => [2, 3, 3, 4].
