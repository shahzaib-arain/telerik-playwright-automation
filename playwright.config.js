// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0, // Reduced retries for faster feedback
  workers: process.env.CI ? 2 : 3, // More workers for parallel execution
  reporter: [
    ['html', { outputFolder: 'playwright-report' }], // Changed to avoid conflict
    ['json', { outputFolder: 'test-results/json-report' }],
    ['junit', { outputFolder: 'test-results/junit-report' }],
    ['list']
  ],
  use: {
    baseURL: 'https://www.telerik.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure', // Only screenshot on failure to save space
    video: 'off', // Only record video on failure
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 15000, // Added: Timeout for individual actions
    navigationTimeout: 30000, // Added: Timeout for navigation
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Commented out other browsers for faster testing during development
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    // // Mobile testing
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],
  timeout: 40000, // Increased global timeout for slow pages
  expect: {
    timeout: 10000 // Increased expectation timeout
  }
});