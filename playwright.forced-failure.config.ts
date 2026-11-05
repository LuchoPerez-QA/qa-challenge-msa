import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/forced-failure',

  reporter: [
    ['html', {
      outputFolder: 'forced-failure-report',
      open: 'never'
    }]
  ],

  use: {
    ...devices['Desktop Chrome'],

    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure'
  },

  outputDir: 'test-results/forced-failure'
});