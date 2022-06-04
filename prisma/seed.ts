import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

import { getNewReview } from 'test/data';

const prisma = new PrismaClient();

const seed = async () => {
  const product = await prisma.product.create({
    data: {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
    },
  });

  const users = Array.from(
    { length: faker.datatype.number({ min: 500, max: 700 }) },
    () => {
      const { name, email, rating, comment } = getNewReview();
      return {
        name,
        email,
        initialReview: {
          rating,
          comment,
        },
      };
    },
  );

  for (const user of users) {
    const pastDate = faker.date.past(2);
    const createdAt = faker.date.between(pastDate, Date.now());
    const createdAtDay = new Date(createdAt);
    createdAtDay.setUTCHours(0, 0, 0, 0);

    await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        createdAt,
        reviews: {
          create: {
            rating: user.initialReview.rating,
            body: user.initialReview.comment,
            productId: product.id,
            createdAt,
            createdAtDay,
          },
        },
      },
    });
  }
};

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
