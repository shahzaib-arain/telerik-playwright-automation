// utils/helpers.js
export const helpers = {
  // Generate random test data
  generateRandomEmail() {
    return `test${Date.now()}@example.com`;
  },

  generateRandomName() {
    return `TestUser${Math.floor(Math.random() * 10000)}`;
  },

  // Format test case names
  formatTestCaseName(name) {
    return name.replace(/\s+/g, '_').toLowerCase();
  },

  // Wait for specific time
  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  // Validate email format
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Extract all links from page
  async getAllLinks(page) {
    return await page.$$eval('a', links => 
      links.map(link => ({
        text: link.textContent.trim(),
        href: link.href,
        target: link.target
      }))
    );
  }
};