const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');

let browser;
let page;
var msg = '';

Given('I am on the form page', async () => {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto('https://vladimirwork.github.io/web-ui-playground/');
  
});

When('I enter valid form data', async () => {
  const firstName = 'John';
  const lastName = 'Doe';
  const email = 'johndoe@example.com';
  const phone = '1234567890';

  await page.fill('input[name="FirstName"]', firstName);
  await page.fill('input[name="LastName"]', lastName);
  await page.fill('input[name="Email"]', email);
  await page.fill('input[name="PhoneNumber"]', phone);
  await page.check('input[type="radio"][value="Male"]');
  await page.check('input[type="checkbox"][name="Agreement"]');
  
});

When('I enter incomplete form data', async () => {
  const firstName = 'John';
  const email = 'johndoe@example.com';
  await page.fill('input[name="FirstName"]', firstName);
  await page.fill('input[name="Email"]', email);
});

When('I click the Submit button', async () => {
  
  await Promise.all([
    page.on('dialog', dialog => msg = dialog.message()),
    page.on('dialog', dialog => dialog.accept()),
    console.log(msg),
    page.click('input[type="submit"][name="submitbutton"]'),
  ]);

});

Then('I should assert the success message', async () => {
  const expectedJson = '{"FirstName":"John","LastName":"Doe","Email":"johndoe@example.com","PhoneNumber":"1234567890","Gender":"Male","Agreement":true}';
  await expect(msg).toContain(expectedJson);
  await browser.close();
});
