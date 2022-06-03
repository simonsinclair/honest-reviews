import prisma from '~/services/database.server';

type ProductWithRating = {
  id: string;
  name: string;
  description: string;
  ratingAvg: number;
  ratingCount: number;
};

export const getProducts = async (): Promise<ProductWithRating[]> => {
  return await prisma.$queryRaw`
    SELECT
      Product.id,
      Product.name,
      Product.description,
      AVG(Review.rating) AS ratingAvg,
      COUNT(Review.id) AS ratingCount
    FROM Product
    INNER JOIN Review
      ON Review.productId = Product.id 
    GROUP BY
      Product.id
  `;
};

export const getProductById = async ({ id }: { id: string }) => {
  return await prisma.product.findUnique({
    where: {
      id,
    },
  });
};
