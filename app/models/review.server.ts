import prisma from '~/services/database.server';

export const getDailyRatingsByProductId = async ({
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
