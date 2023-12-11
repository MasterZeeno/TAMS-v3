import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/profile/i);
});

test('get started link', async ({ page }) => {
  await page.goto('/tams/App');
  // Click the get started link.
  await page.locator('li#menu_ot a').click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.locator('li a span.hidden-xs')).toBeVisible();
});
