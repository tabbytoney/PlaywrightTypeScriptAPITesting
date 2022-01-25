import { expect, test } from '@playwright/test';

//testing a keyless api
test('Get an Incident', async ({ request }) => {
  const response = await request.get('https://catfact.ninja/fact', {});
  console.log(await response.json());
  expect(response.status()).toBe(200);
});
