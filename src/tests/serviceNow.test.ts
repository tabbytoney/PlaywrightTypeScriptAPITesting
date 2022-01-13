import { expect, test } from '@playwright/test';

// Create an incident ticket in my service-now incident/page - POST
// use request instead of page
test('Create an Incident', async ({ request, baseURL }) => {
  // add base url (the endpoint url) to .post
  // underscore makes the variable more secret?
  const _response = await request.post(`${baseURL}`, {
    data: {
      // body info from endpoint goes here
      'short_description': 'everything is on fire',
      'category': 'hardware'
    }
  });
  // verification
  expect(_response.status()).toBe(200);
  expect(_response.ok()).toBeTruthy();
});
