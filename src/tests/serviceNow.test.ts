import { expect, test } from '@playwright/test';

let number: number;
let sys_id: string;
const shortDescription: string = 'required ms office 365';

// POST
// Create an incident ticket in my service-now incident/page
// use request instead of page
test('Create an Incident', async ({ request, baseURL }) => {
  // add base url (the endpoint url) to .post
  // underscore makes the variable more secret? _reponse
  const response = await request.post(`${baseURL}`, {
    data: {
      // body info from endpoint goes here
      'short_description': shortDescription,
      'category': 'hardware'
    }
    // This has to be added to get it returned as an xml rather than json
    // headers: {
    //   'Accept': 'application/xml'
    // }
  });
  // verification
  expect(response.status()).toBe(201);
  expect(response.ok()).toBeTruthy();
  // this will print the entire body in the terminal along with test results
  console.log(await response.json());
  // assigns the incident number to a var so we can use it in our GET request
  const res = await response.json();
  number = res.result.task_effective_number; // t.e.n. is what incident number is called in the api results
  sys_id = res.result.sys_id;
  // output as xml - both json and xml are supported. Added headers after adding this next line
  // console.log(await (await response.body()).toString());
});

// Another way to do GET
// test('', async ({ page }) => {
//   await page.request.get('');
// });

// GET
test('Get an Incident', async ({ request, baseURL }) => {
  const response = await request.get(`${baseURL}`, {
    // what we expect the json body (from the previous POST)
    params: {
      task_effective_number: number,
      sysparm_fields: 'short_description, category'
    }
  });
  // only prints the info you've asked for in params
  console.log(await response.json());
  expect(response.status()).toBe(200);
  // verify the response - make sure we get back the info we're expecting
  expect(await response.json()).toMatchObject({
    result: [
      {
        short_description: shortDescription,
        category: 'hardware'
      }
    ]
  });
});

// PUT aka Update
test('Change or Put an Incident', async ({ request, baseURL }) => {
  const response = await request.put(`${baseURL}/${sys_id}`, {
    // what we are going to change
    data: {
      'short_description': 'Put part of tutorial',
      'category': 'software'
    }
  });
  // only prints the info you've asked for in params
  console.log(await response.json());
  // verify
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();
});

// DELETE
test('Delete an Incident', async ({ request, baseURL }) => {
  const response = await request.delete(`${baseURL}/${sys_id}`);
  // only prints the info you've asked for in params
  // console.log(await response.json());
  // verify
  expect(response.status()).toBe(204); // 204 = deleted
  expect(response.ok()).toBeTruthy();
});
