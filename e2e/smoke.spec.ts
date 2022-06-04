import { test, expect } from '@playwright/test';
import { getNewReview } from 'test/data';

import { RATING_MAX } from '~/lib/constants';

test.describe('smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
    await page.locator('role=link[name^="Rated"]').first().click();
  });

  test('a review can be posted', async ({ page }) => {
    const { name, email, rating, comment } = getNewReview();

    await page.locator('role=link[name="Write a review"]').click();
    await page.locator('role=textbox[name="Name"]').fill(name);
    await page.locator('role=textbox[name="Email"]').fill(email);
    await page.locator(`label:has-text("${rating}")`).click();
    await page.locator('role=textbox[name="Comment"]').fill(comment);
    await page.locator('role=button[name="Post review"]').click();

    const review = await page.locator('article').first();
    await expect(review.locator(`role=link[name="${name}"]`)).toHaveAttribute(
      'href',
      `mailto:${email}`,
    );
    await expect(
      review.locator(`role=img[name="Rated ${rating} out of ${RATING_MAX}."]`),
    ).toHaveCount(1);
    await expect(review.locator('time')).toHaveText('a few seconds ago');
    const paragraphs = comment.split('\n');
    for (let i = 0; i < paragraphs.length; i++) {
      await expect(review.locator('p').nth(i)).toHaveText(paragraphs[i]);
    }
  });
});
