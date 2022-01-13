import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: 'on-first-retry',
    baseURL: 'https://dev95993.service-now.com/api/now/table/incident',
    extraHTTPHeaders: {
      // Basic - like the basic auth option in Postman. Code was generated on Base64
      'Authorization': 'Basic YWRtaW46a1hlRERQdXg3UDFi'
    }
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
};
export default config;
