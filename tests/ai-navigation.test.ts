import { test, expect } from '@playwright/test';
import { voiceOver } from '@guidepup/playwright';
import { OpenAI } from '@langchain/openai';
import { GroqCloud } from '@langchain/groq';

const AI_PROVIDER = process.env.AI_PROVIDER || 'openai';
const AI_API_KEY = process.env.AI_API_KEY || process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY;
const TEST_URL = process.env.TEST_URL || 'http://localhost:3000';

function getAIModel() {
  if (AI_PROVIDER === 'groq') {
    return new GroqCloud({
      apiKey: AI_API_KEY,
      model: 'llama-3.1-70b-versatile',
      temperature: 0.3,
    });
  }
  return new OpenAI({
    apiKey: AI_API_KEY,
    model: 'gpt-4o-mini',
    temperature: 0.3,
  });
}

test.describe('AI-Powered Screen Reader Navigation Test', () => {
  test('AI should navigate to find secret information without hints', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Screen reader tests only run in Chromium');
    
    const model = getAIModel();
    
    await page.goto(TEST_URL);
    
    const screenReader = await voiceOver.start();
    
    try {
      let navigationComplete = false;
      let attempts = 0;
      const maxAttempts = 10;
      let foundSecret = false;
      
      while (!navigationComplete && attempts < maxAttempts) {
        attempts++;
        
        const screenContent = await screenReader.spokenPhraseLog();
        const currentUrl = page.url();
        
        const prompt = `You are an AI assistant helping a blind user navigate a website using a screen reader.
        
Current URL: ${currentUrl}
Current screen reader output: ${screenContent.join(' ')}

Your task: Find any secret or hidden information on this website. You need to explore the site to discover special content.

Available actions:
1. "PRESS_TAB" - Move to next focusable element
2. "PRESS_ENTER" - Activate current element (button/link)
3. "READ_HEADING" - Read all headings on page
4. "READ_CONTENT" - Read main content
5. "FOUND_SECRET:[content]" - Report when you find secret information

Based on the current screen reader output, what action should you take next? Respond with only the action.`;

        const response = await model.invoke(prompt);
        const action = response.content.toString().trim();
        
        console.log(`Attempt ${attempts}: AI chose action: ${action}`);
        
        if (action.startsWith('FOUND_SECRET:')) {
          const secret = action.replace('FOUND_SECRET:', '').trim();
          console.log(`AI found secret: ${secret}`);
          
          const pageContent = await page.content();
          if (pageContent.includes('QUANTUM-LEAP-2024')) {
            foundSecret = true;
            navigationComplete = true;
            console.log('SUCCESS: AI successfully found the secret code!');
          }
        } else if (action === 'PRESS_TAB') {
          await screenReader.press('Tab');
          await page.waitForTimeout(500);
        } else if (action === 'PRESS_ENTER') {
          await screenReader.press('Enter');
          await page.waitForTimeout(1000);
        } else if (action === 'READ_HEADING') {
          await screenReader.next();
          await page.waitForTimeout(500);
        } else if (action === 'READ_CONTENT') {
          await screenReader.act();
          await page.waitForTimeout(500);
        }
        
        if (page.url().includes('secret-info')) {
          await page.waitForTimeout(1000);
          const content = await page.textContent('body');
          if (content?.includes('QUANTUM-LEAP-2024')) {
            foundSecret = true;
            navigationComplete = true;
            console.log('SUCCESS: AI navigated to secret page and found the code!');
          }
        }
      }
      
      expect(foundSecret).toBe(true);
      
    } finally {
      await screenReader.stop();
    }
  });
  
  test('Validate accessibility of test pages', async ({ page }) => {
    await page.goto(TEST_URL);
    
    const headingCount = await page.locator('h1, h2, h3').count();
    expect(headingCount).toBeGreaterThan(0);
    
    const buttons = await page.locator('button').all();
    for (const button of buttons) {
      const ariaLabel = await button.getAttribute('aria-label');
      const textContent = await button.textContent();
      expect(ariaLabel || textContent).toBeTruthy();
    }
    
    await page.goto(`${TEST_URL}/secret-info`);
    
    const secretContent = await page.textContent('.secret-code');
    expect(secretContent).toContain('QUANTUM-LEAP-2024');
    
    const ariaLive = await page.locator('[aria-live]').count();
    expect(ariaLive).toBeGreaterThan(0);
  });
});