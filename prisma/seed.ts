import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

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
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();

      return {
        email: faker.internet.email(firstName, lastName),
        name: `${firstName} ${lastName}`,
      };
    },
  );

  for (const user of users) {
    const createdAt = faker.date.past(2);
    await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        createdAt,
        reviews: {
          create: {
            rating: faker.datatype.number({ min: 1, max: 5 }),
            body: faker.lorem.paragraphs(
              faker.datatype.number({ min: 1, max: 3 }),
            ),
            productId: product.id,
            createdAt: faker.date.between(createdAt, Date.now()),
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
