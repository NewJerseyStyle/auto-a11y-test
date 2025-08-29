import { defineConfig, devices } from '@playwright/test';
import * as os from 'os';

const isWindows = os.platform() === 'win32';
const isMac = os.platform() === 'darwin';

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  retries: 2,
  reporter: 'list',
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  projects: [
    // Use chromium on Windows for better compatibility
    isWindows && {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Use webkit on macOS for testing
    isMac && {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Fallback to chromium for other platforms
    !isWindows && !isMac && {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ].filter(Boolean),
});