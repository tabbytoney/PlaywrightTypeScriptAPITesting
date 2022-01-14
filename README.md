# PlaywrightTypeScriptAPITesting

An example of using Playwright to test all forms of api requests. 

#Note:
The code in this repo will not work - I used an instance I created on Service Now as a test api. 
See screen recording file to see the test run results. 

My credentials are not in the code and the instance will go down in 10 days from creation. 
This serves as an example of api test code in Playwright. 

You can replace the baseURL in playwright.config.js with an api endpoint of your choosing and add your credentials
to the file playwright.config.js file:
 extraHTTPHeaders: {
      'Authorization': 'Basic your-credentials-here'
    }
    
I used Base64 to create a code for the user/password when I ran it. 

I don't use any kind of reporting tool, just had it print the results in json format. 

