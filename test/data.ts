import { faker } from '@faker-js/faker';

import { RATING_MAX } from '~/lib/constants';

/**
 * Generate Review form data.
 * @returns New Review form data.
 */
export const getNewReview = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  return {
    name: `${firstName} ${lastName}`,
    email: faker.internet.email(firstName, lastName),
    rating: faker.datatype.number({ min: 1, max: RATING_MAX }),
    comment: faker.lorem.paragraphs(faker.datatype.number({ min: 1, max: 3 })),
  };
};
