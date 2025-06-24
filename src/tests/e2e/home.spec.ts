import { test, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage'

test.describe('Home Page Tests', () => {
  test('should load home page successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    
    // Verify page title
    const title = await homePage.getTitle();
    expect(title).toContain('Nava Tech');
  });
  
  test('should navigate to Contact page via navigation', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    
    // Click contact link in navigation
    await homePage.clickOnContactUs();
    
    // Verify URL changed to contact page
    await expect(page).toHaveURL(/\/contact/);
  });
  
  test('should navigate to Services page via navigation', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    
    // Click services link in navigation
    await homePage.clickOnServices();
    
    // Verify URL changed to services page
    await expect(page).toHaveURL(/\/services/);
  });
  
  test('should navigate to Portfolio page via navigation', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    
    // Click portfolio link in navigation
    await homePage.clickOnPortfolio();
    
    // Verify URL changed to portfolio page
    await expect(page).toHaveURL(/\/portfolio/);
  });
  
  test('should navigate to Team page via navigation', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    
    // Click team link in navigation
    await homePage.clickOnTeam();
    
    // Verify URL changed to team page
    await expect(page).toHaveURL(/\/team/);
  });
  
  test('should navigate to Resources page via navigation', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    
    // Click resources link in navigation
    await homePage.clickOnResources();
    
    // Verify URL changed to resources page
    await expect(page).toHaveURL(/\/resources/);
  });
  
  test('should navigate to Home page via navigation', async ({ page }) => {
    // First navigate to another page to test navigation back to home
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.clickOnServices();
    
    // Now click home to navigate back
    await homePage.clickOnHome();
    
    // Verify URL is home page
    await expect(page).toHaveURL(/^\/$|\/home$/);
  });

  test('should verify all navigation links are visible', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    
    // Check if all navigation elements are visible
    await expect(homePage.divHome).toBeVisible();
    await expect(homePage.divServices).toBeVisible();
    await expect(homePage.divPortfolio).toBeVisible();
    await expect(homePage.divTeam).toBeVisible();
    await expect(homePage.divResources).toBeVisible();
    await expect(homePage.divContactUs).toBeVisible();
  });
});