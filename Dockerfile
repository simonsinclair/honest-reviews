FROM node:16-bullseye-slim as base

ENV NODE_ENV="production"

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl sqlite3

# Install all node_modules, including dev dependencies
FROM base as dependencies

WORKDIR /honest-reviews

ADD package.json package-lock.json ./
RUN npm install --production=false

# Setup production node_modules
FROM base as production-dependencies

WORKDIR /honest-reviews

COPY --from=dependencies /honest-reviews/node_modules /honest-reviews/node_modules
ADD package.json package-lock.json ./

# Usually we'd prune all packages not required in production, but we'd like
# people to be able to seed the application database from the container.
# RUN npm prune --production

# Build the app
FROM base as build

WORKDIR /honest-reviews

COPY --from=dependencies /honest-reviews/node_modules /honest-reviews/node_modules

ADD prisma .
RUN npx prisma generate

ADD . .
RUN npm run build

# Finally, build the production image
FROM base

ENV DATABASE_URL="file:/honest-reviews.db"

WORKDIR /honest-reviews

COPY --from=production-dependencies /honest-reviews/node_modules /honest-reviews/node_modules
COPY --from=build /honest-reviews/node_modules/.prisma /honest-reviews/node_modules/.prisma

COPY --from=build /honest-reviews/build /honest-reviews/build
COPY --from=build /honest-reviews/public /honest-reviews/public
ADD . .

CMD ["npm", "start"]
