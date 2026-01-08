// tests/07-additional-robust-tests.spec.js
import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/base-page.js';

test.describe('Additional Robust Tests', () => {
  let basePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    await basePage.navigateTo();
    await page.waitForTimeout(2000);
  });

 test('TC061: Verify all section headers are properly formatted', async ({ page }) => {
    // FIX: Use more flexible header detection
    const headers = page.locator('h1, h2, h3, h4, .TK-Dash-Title, [class*="title"], [class*="header"]');
    const headerCount = await headers.count();
    
    // Should have some headers
    expect(headerCount).toBeGreaterThan(0);
    
    // Check first few headers
    for (let i = 0; i < Math.min(headerCount, 3); i++) {
      const header = headers.nth(i);
      const text = await header.textContent();
      
      // Headers should have some text
      if (text) {
        expect(text.trim().length).toBeGreaterThan(0);
      }
    }
  });

  test('TC062: Verify all product cards have consistent structure', async ({ page }) => {
    // Get all product cards
    const productCards = page.locator('.TK-Product-Card, div[class*="product-card"]');
    const cardCount = await productCards.count();
    
    if (cardCount > 0) {
      // Check first 3 cards for consistency
      for (let i = 0; i < Math.min(cardCount, 3); i++) {
        const card = productCards.nth(i);
        
        // Should have a title/name
        const title = card.locator('h3, h4, .TK-Product-Name, strong').first();
        await expect(title).toBeVisible();
        
        // Should have a description
        const description = card.locator('p, .TK-Product-Description').first();
        await expect(description).toBeVisible();
        
        // Should have at least one action button/link
        const actionButton = card.locator('a, button').first();
        await expect(actionButton).toBeVisible();
        
        // Check button has valid href or onclick
        const href = await actionButton.getAttribute('href');
        const onClick = await actionButton.getAttribute('onclick');
        expect(href || onClick).toBeTruthy();
      }
    }
  });

  test('TC063: Test search functionality (if available)', async ({ page }) => {
    // Look for search input
    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"], #search');
    
    if (await searchInput.count() > 0) {
      await expect(searchInput).toBeVisible();
      
      // Test typing in search
      await searchInput.fill('demos');
      await searchInput.press('Enter');
      
      // Wait for search results or page change
      await page.waitForTimeout(2000);
      
      // Should either show results or stay on page
      const currentUrl = page.url();
      expect(currentUrl).toContain('telerik.com');
    } else {
      console.log('Search functionality not found, skipping test');
    }
  });

  test('TC064: Verify responsive design on multiple viewports', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080, name: 'desktop' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 375, height: 667, name: 'mobile' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.waitForTimeout(1000);
      
      // Verify critical elements are visible
      const logo = page.locator('.TK-TLRK-Logo, .TK-Logo').first();
      await expect(logo).toBeVisible();
      
      const mainHeading = page.locator('h1:has-text("Demos")').first();
      await expect(mainHeading).toBeVisible();
      
      // Take screenshot for each viewport
      await page.screenshot({
        path: `test-results/screenshots/viewport-${viewport.name}-${Date.now()}.png`,
        fullPage: true
      });
    }
  });

  test('TC065: Test keyboard accessibility and focus management', async ({ page }) => {
    // Test Tab navigation through main interactive elements
    await page.keyboard.press('Tab');
    await page.waitForTimeout(500);
    
    // Get currently focused element
    const focusedElement = page.locator('*:focus');
    expect(await focusedElement.count()).toBe(1);
    
    // First focused element should be a link or button
    const tagName = await focusedElement.evaluate(el => el.tagName.toLowerCase());
    const focusableTags = ['a', 'button', 'input', 'textarea', 'select'];
    expect(focusableTags).toContain(tagName);
    
    // Test Tab through several elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(300);
      
      const currentFocused = page.locator('*:focus');
      if (await currentFocused.count() > 0) {
        const currentTag = await currentFocused.evaluate(el => el.tagName.toLowerCase());
        expect(focusableTags).toContain(currentTag);
      }
    }
    
    // Test Enter key on a focused link
    await page.goto('https://www.telerik.com/support/demos');
    await page.waitForTimeout(1000);
    
    // Focus on first main link and press Enter
    const firstLink = page.locator('a[href^="/"]:visible').first();
    await firstLink.focus();
    await page.keyboard.press('Enter');
    await page.waitForLoadState();
    
    // Should have navigated
    expect(page.url()).toContain('telerik.com');
  });
});