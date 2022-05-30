import prisma from '~/services/database.server';

export const getAverageRatingByProductId = async ({ id }: { id: string }) => {
  return await prisma.review.aggregate({
    where: {
      productId: id,
    },
    _count: true,
    _avg: {
      rating: true,
    },
  });
};

export const getAverageDailyRatingsByProductId = async ({
  id,
  take,
  order,
}: {
  id: string;
  take: number;
  order: 'asc' | 'desc';
}) => {
  return await prisma.review.groupBy({
    by: ['createdAtDay'],
    where: {
      productId: id,
    },
    take,
    orderBy: {
      createdAtDay: order,
    },
    _avg: {
      rating: true,
    },
  });
};
