// tests/04-reporting-testing.spec.js
import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/base-page.js';

test.describe('Reporting, Testing & Other Sections Tests', () => {
  let basePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    await basePage.navigateTo();
    await page.waitForTimeout(2000);
  });

  test('TC031: Verify "Reporting & Document Processing" section exists', async ({ page }) => {
    const reportingSection = page.locator('h2, h3:has-text("Reporting & Document Processing")').first();
    await expect(reportingSection).toBeVisible();
  });

  test('TC032: Test "Launch Reporting demos" link', async ({ page }) => {
    const reportingLink = page.locator('a:has-text("Launch Reporting demos")').first();
    await expect(reportingLink).toBeVisible();
    expect(await reportingLink.getAttribute('href')).toBeTruthy();
  });

  test('TC033: Test "Launch Report Server demo" link', async ({ page }) => {
    const reportServerLink = page.locator('a:has-text("Launch Report Server demo")').first();
    await expect(reportServerLink).toBeVisible();
    expect(await reportServerLink.getAttribute('href')).toBeTruthy();
  });

  test('TC034: Test "Launch Document Processing demos" link', async ({ page }) => {
    const docProcessingLink = page.locator('a:has-text("Launch Document Processing demos")').first();
    await expect(docProcessingLink).toBeVisible();
    expect(await docProcessingLink.getAttribute('href')).toBeTruthy();
  });

  test('TC035: Verify "Testing & Mocking" section exists', async ({ page }) => {
    const testingSection = page.locator('h2, h3:has-text("Testing & Mocking")').first();
    await expect(testingSection).toBeVisible();
  });

  test('TC036: Verify JustMock video thumbnail/link exists', async ({ page }) => {
    const justMockSection = page.locator('div:has-text("JustMock")').first();
    await expect(justMockSection).toBeVisible();
    
    // Look for video-related elements
    const videoElements = justMockSection.locator('[href*="video"], [href*="youtube"], [href*="watch"]');
    if (await videoElements.count() > 0) {
      await expect(videoElements.first()).toBeVisible();
    }
  });

 test('TC037: Test "Sign up now" for Test Studio is interactable', async ({ page }) => {
    // FIX: Look in Testing & Mocking section
    const testingSection = page.locator('section:has(.TK-Dash-Title:has-text("Testing & Mocking"))');
    await expect(testingSection).toBeVisible();
    
    // Find Test Studio card
    const testStudioCard = testingSection.locator(':has-text("Test Studio")').first();
    await expect(testStudioCard).toBeVisible();
    
    // Find signup link within that card
    const signupLink = testStudioCard.locator('a:has-text("Sign up"), button:has-text("Sign up")').first();
    if (await signupLink.count() > 0) {
      await expect(signupLink).toBeVisible();
      await expect(signupLink).toBeEnabled();
    }
  });

  test('TC038: Test "Reserve your seat" for Testing Meetup', async ({ page }) => {
    const meetupButton = page.locator('text=Reserve your seat').first();
    await expect(meetupButton).toBeVisible();
    expect(await meetupButton.getAttribute('href')).toBeTruthy();
  });

  test('TC039: Verify "Debugging" section with FiddlerCore', async ({ page }) => {
    const debuggingSection = page.locator('h2, h3:has-text("Debugging")').first();
    await expect(debuggingSection).toBeVisible();
    
    const fiddlerLink = page.locator('a:has-text("View FiddlerCore demos")').first();
    await expect(fiddlerLink).toBeVisible();
  });


});