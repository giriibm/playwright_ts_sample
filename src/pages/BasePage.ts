import { Page, Locator, expect } from '@playwright/test';

/**
 * Base Page Object Model class
 * All page objects should extend this class
 */
export default class BasePage {
  readonly page: Page;
  readonly url: string;

  /**
   * Initialize the base page
   * @param page - Playwright page object
   * @param url - Relative URL of the page
   */
  constructor(page: Page, url: string = '/') {
    this.page = page;
    this.url = url;
  }

  /**
   * Navigate to the page
   */
  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Wait for navigation to complete
   */
  async waitForNavigation(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for an element to be visible
   * @param locator - Element locator
   */
  async waitForElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }

  /**
   * Check if an element is visible
   * @param locator - Element locator
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Click an element
   * @param locator - Element locator
   */
  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  /**
   * Fill a form field
   * @param locator - Element locator
   * @param value - Value to fill
   */
  async fill(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  /**
   * Get text from an element
   * @param locator - Element locator
   */
  async getText(locator: Locator): Promise<string> {
    return await locator.innerText();
  }

  /**
   * Verify page title contains text
   * @param text - Text to search for in title
   */
  async verifyTitle(text: string): Promise<void> {
    await expect(this.page).toHaveTitle(new RegExp(text));
  }

  /**
   * Take a screenshot
   * @param name - Name of the screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `./e2e/screenshots/${name}.png` });
  }

  /**
   * Get a locator by test ID
   * @param testId - Test ID value
   */
  getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }
}
