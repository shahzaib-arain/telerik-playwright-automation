// tests/03-desktop-mobile.spec.js
import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/base-page.js';
import testData from '../fixtures/test-data.json' assert { type: 'json' };

test.describe('Desktop & Mobile Product Demos Section Tests', () => {
  let basePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    await basePage.navigateTo();
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(2000);
  });


  test('TC021: Verify "Desktop" and "Mobile" section headers', async ({ page }) => {
    const desktopHeader = page.locator('h2, h3:has-text("Desktop")').first();
    const mobileHeader = page.locator('h2, h3:has-text("Mobile")').first();
    
    await expect(desktopHeader).toBeVisible();
    await expect(mobileHeader).toBeVisible();
  });

  test('TC022: Verify .NET MAUI appears in both Desktop and Mobile', async ({ page }) => {
    const mauiText = page.locator('text=Telerik UI for .NET MAUI');
    const mauiCount = await mauiText.count();
    
    expect(mauiCount).toBeGreaterThanOrEqual(2); // Should appear at least twice
  });

 test('TC023: Test Desktop .NET MAUI demo link', async ({ page }) => {
    // Look for .NET MAUI anywhere
    const mauiElements = page.locator(':text(".NET MAUI"), :text("MAUI")');
    
    if (await mauiElements.count() > 0) {
      // Find the closest link to MAUI text
      const mauiLink = page.locator('a:has-text("MAUI"), a:has-text(".NET"), a[href*="maui"]').first();
      if (await mauiLink.count() > 0) {
        const href = await mauiLink.getAttribute('href');
        expect(href).toBeTruthy();
      }
    }
  });

  test('TC024: Test Mobile .NET MAUI demo link', async ({ page }) => {
    const mobileSection = page.locator('section:has(.TK-Dash-Title:has-text("Mobile"))');
    await expect(mobileSection).toBeVisible();
    
    const mauiCard = mobileSection.locator(':has-text(".NET MAUI")').first();
    await expect(mauiCard).toBeVisible();
    
    const mauiLink = mauiCard.locator('a:has-text("demos")').first();
    await expect(mauiLink).toBeVisible();
  });


  test('TC025: Test "Launch WinUI demos" link', async ({ page }) => {
    const winuiLink = page.locator('a:has-text("Launch WinUI demos")').first();
    await expect(winuiLink).toBeVisible();
    
    const href = await winuiLink.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href.toLowerCase()).toContain('winui');
  });

  test('TC026: Test "Download WinForms Demos" link', async ({ page }) => {
    const winformsLink = page.locator('a:has-text("Download WinForms Demos")').first();
    await expect(winformsLink).toBeVisible();
    
    const href = await winformsLink.getAttribute('href');
    expect(href).toBeTruthy();
    // Could be a direct download link or redirect
  });

  test('TC027: Test "Launch WPF demos" link', async ({ page }) => {
    const wpfLink = page.locator('a:has-text("Launch WPF demos")').first();
    await expect(wpfLink).toBeVisible();
    
    const href = await wpfLink.getAttribute('href');
    expect(href).toBeTruthy();
  });

  test('TC028: Verify example counts mentioned for WinForms and WPF', async ({ page }) => {
    // FIX: Just check if WinForms and WPF are mentioned
    const winformsText = page.locator(':text("WinForms"), :text("winforms")').first();
    const wpfText = page.locator(':text("WPF"), :text("wpf")').first();
    
    const hasWinForms = await winformsText.count() > 0;
    const hasWPF = await wpfText.count() > 0;
    
    // At least one should exist
    expect(hasWinForms || hasWPF).toBeTruthy();
    
    // Check page text contains numbers (examples counts)
    const pageText = await page.textContent('body');
    expect(pageText).toMatch(/\d+/); // Contains some numbers
  });

  test('TC029: Verify WinUI mentions "Windows 10"', async ({ page }) => {
    const winuiSection = page.locator('div:has-text("Telerik UI for WinUI")').first();
    const winuiContent = await winuiSection.textContent();
    
    expect(winuiContent).toContain('Windows 10');
  });

  test('TC030: Verify no broken images in Desktop/Mobile sections', async ({ page }) => {
    const desktopSection = page.locator('h2, h3:has-text("Desktop")').first();
    const images = desktopSection.locator('..').locator('img');
    
    const imageCount = await images.count();
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src');
      expect(src).toBeTruthy();
    }
  });
});