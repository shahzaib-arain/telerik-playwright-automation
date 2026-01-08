// pages/base-page.js
import { expect } from '@playwright/test';

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(path = '/support/demos') {
    // Use load state instead of networkidle which can timeout
    await this.page.goto(`https://www.telerik.com${path}`);
    await this.page.waitForLoadState('domcontentloaded');
    // Wait for any critical elements
    await this.page.waitForTimeout(3000); // Give time for JS to execute
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async waitForElement(selector, timeout = 10000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  async waitForElementVisible(selector, timeout = 15000) {
    const element = this.page.locator(selector).first();
    await element.waitFor({ state: 'visible', timeout });
    return element;
  }

  async clickElement(selector) {
    await this.page.click(selector);
  }

  async fillField(selector, text) {
    await this.page.fill(selector, text);
  }

  async getElementText(selector) {
    return await this.page.textContent(selector);
  }

  async isElementVisible(selector) {
    const element = this.page.locator(selector).first();
    return await element.isVisible();
  }

  async isElementAttached(selector) {
    const element = this.page.locator(selector).first();
    return await element.count() > 0;
  }

  async takeScreenshot(name) {
    await this.page.screenshot({ 
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }

  async verifyUrlContains(text) {
    await expect(this.page).toHaveURL(new RegExp(text, 'i'));
  }

  async verifyPageTitle(title) {
    await expect(this.page).toHaveTitle(new RegExp(title, 'i'));
  }

  async scrollToElement(selector) {
    const element = this.page.locator(selector).first();
    await element.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(1000);
  }

  async scrollPage(y = 500) {
    await this.page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await this.page.waitForTimeout(1000);
  }

  async getElementAttribute(selector, attribute) {
    const element = this.page.locator(selector).first();
    return await element.getAttribute(attribute);
  }

  async waitForTimeout(ms) {
    await this.page.waitForTimeout(ms);
  }
}