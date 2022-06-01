import prisma from '~/services/database.server';

export const getRatingByProductId = async ({ id }: { id: string }) => {
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

export const getReviewsByProductId = async ({
  id,
  skip = 0,
  take = 10,
}: {
  id: string;
  skip?: number;
  take?: number;
}) => {
  return await prisma.review.findMany({
    where: {
      productId: id,
    },
    skip,
    take,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      User: true,
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
