import prisma from '~/services/database.server';

export const getProducts = async () => await prisma.product.findMany();

export const getProductById = async ({ id }: { id: string }) => {
  return await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      reviews: {
        include: {
          User: true,
        },
        take: 20,
      },
    },
  });
};
