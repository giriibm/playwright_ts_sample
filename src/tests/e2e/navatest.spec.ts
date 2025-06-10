import { test, expect } from '@playwright/test';

test('nava has title', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Nava/);
});

test('click on Book Now ', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    if (await page.locator('div.main-header-one__bottom-right>div>a').isVisible()) {
        await expect(page.locator('div.main-header-one__bottom-right>div>a')).toBeVisible();
        await page.locator('div.main-header-one__bottom-right>div>a').click();
    }

});
