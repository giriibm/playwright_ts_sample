import { Page, Locator } from '@playwright/test';
import BasePage from './BasePage';

/**
 * Home Page Object Model
 */
export default class HomePage extends BasePage {
    // Page elements
    readonly header: Locator;
    readonly divHome: Locator;
    readonly divAboutUs: Locator;
    readonly divServices: Locator;
    readonly divServicesArrow: Locator;
    readonly divPortfolio: Locator;
    readonly divBlog: Locator;    
    readonly divResourcesArrow: Locator;
    readonly divContactUs: Locator;

    readonly divPhoneNumber: Locator;
    readonly divLogin: Locator;
    readonly divBookaCall: Locator;

    readonly divTempNav: Locator;

    readonly spanHome: Locator;



    /**
     * Initialize the Home page
     * @param page - Playwright page object
     */
    constructor(page: Page) {
        super(page, '/'); // Home page is at root URL

        // Initialize locators
        this.header = this.page.locator('nav > * > header');
        this.divHome = this.page.locator('header>div>nav>div:nth-child(1)'); // Update selector as needed
        this.divAboutUs = this.page.locator('header>div>nav>div:nth-child(2)');
        this.divServices = this.page.locator('header>div>nav>div:nth-child(3)');
        this.divPortfolio = this.page.locator('header>div>nav>div:nth-child(4)');
        this.divBlog = this.page.locator('header>div>nav>div:nth-child(5)');        
        this.divContactUs = this.page.locator('header>div>nav>div:nth-child(6)');

        this.divServicesArrow = this.page.locator('header>*>nav>div:nth-child(3)>a');
        this.divResourcesArrow = this.page.locator('header>*>nav>div:nth-child(6)>a');

        this.divPhoneNumber = this.page.locator('body > nav > div > header > div>a:nth-child(1)');
        this.divLogin = this.page.locator('body > nav > div > header > div>a:nth-child(2)');
        this.divBookaCall = this.page.locator('body > nav > div > header > div>a:nth-child(3)');

        this.divTempNav = this.page.locator('body>div:nth-child(3)')

        this.spanHome = this.page.locator('h1>span')


    }

    /**
     * Navigate to Home page
     */
    async navigateTo(): Promise<void> {
        await this.goto();
        await this.waitForNavigation();
    }

    /**
    * Check if AboutUs div is visible and clickable
    */
    async clickOnAboutUs(): Promise<void> {
        await this.isVisible(this.divAboutUs);
        await this.divAboutUs.click();
    }

    /**
    * Click on the Home navigation element
    */
    async clickOnHome(): Promise<void> {
        await this.isVisible(this.divHome);
        await this.divHome.click();
    }

    /**
     * Click on the Services navigation element
     */
    async clickOnServices(): Promise<void> {
        await this.isVisible(this.divServices);
        await this.divServices.click();
    }

    /**
     * Click on the Portfolio navigation element
     */
    async clickOnPortfolio(): Promise<void> {
        await this.isVisible(this.divPortfolio);
        await this.divPortfolio.click();
    }

    /**
     * Click on the Team navigation element
     */
    async clickOnBlog(): Promise<void> {
        await this.isVisible(this.divBlog);
        await this.divBlog.click();
    }



    /**
     * Click on the Contact Us navigation element
     */
    async clickOnContactUs(): Promise<void> {
        await this.isVisible(this.divContactUs);
        await this.divContactUs.click();
    }

    /**
     * Get the temp page navigation text
     */
    async getDivTempNavText(): Promise<string> {
        return await this.getText(this.divTempNav);
    }








}
