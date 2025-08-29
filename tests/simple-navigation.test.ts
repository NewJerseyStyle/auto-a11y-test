import { test, expect } from '@playwright/test';
import * as os from 'os';

const TEST_URL = process.env.TEST_URL || 'http://localhost:3000';

test.describe('Simple Navigation Test', () => {
  test('Basic page navigation without screen reader', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Only run in Chromium for consistency');
    
    console.log('Testing URL:', TEST_URL);
    
    // Navigate to the test page
    await page.goto(TEST_URL);
    
    // Wait for page to load
    await page.waitForSelector('h1', { timeout: 5000 });
    
    // Check that main page loaded
    const title = await page.title();
    console.log('Page title:', title);
    expect(title).toContain('Test Site');
    
    // Find and click the navigation button
    const button = await page.locator('button:has-text("Discover")').first();
    expect(button).toBeTruthy();
    
    // Click the button to navigate
    await button.click();
    
    // Wait for navigation
    await page.waitForURL('**/secret-info', { timeout: 5000 });
    
    // Verify we reached the secret page
    const secretContent = await page.textContent('body');
    expect(secretContent).toContain('QUANTUM-LEAP-2024');
    
    console.log('SUCCESS: Found secret code QUANTUM-LEAP-2024');
  });
  
  test('Validate accessibility attributes', async ({ page }) => {
    await page.goto(TEST_URL);
    
    // Check for proper headings
    const headings = await page.locator('h1, h2, h3').count();
    expect(headings).toBeGreaterThan(0);
    
    // Check buttons have accessible labels
    const buttons = await page.locator('button').all();
    for (const button of buttons) {
      const ariaLabel = await button.getAttribute('aria-label');
      const textContent = await button.textContent();
      expect(ariaLabel || textContent).toBeTruthy();
    }
    
    // Navigate to secret page
    await page.goto(`${TEST_URL}/secret-info`);
    
    // Verify secret content exists
    const secretCode = await page.textContent('.secret-code');
    expect(secretCode).toContain('QUANTUM-LEAP-2024');
    
    // Check for ARIA live regions
    const ariaLive = await page.locator('[aria-live]').count();
    expect(ariaLive).toBeGreaterThan(0);
    
    console.log('Accessibility validation passed');
  });
});