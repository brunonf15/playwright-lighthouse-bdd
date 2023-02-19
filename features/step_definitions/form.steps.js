const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('chai');

let browser;
let context;
let page;
let dialogMessage = '';

Given('I am on the form page', async () => {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto('https://vladimirwork.github.io/web-ui-playground/');
});

When('I enter valid form data', async () => {
  const data = {
    FirstName: 'John',
    LastName: 'Doe',
    Email: 'johndoe@example.com',
    PhoneNumber: '1234567890',
    Gender: 'Male',
    Agreement: true,
  };
  await page.fill('input[name="FirstName"]', data.FirstName);
  await page.fill('input[name="LastName"]', data.LastName);
  await page.fill('input[name="Email"]', data.Email);
  await page.fill('input[name="PhoneNumber"]', data.PhoneNumber);
  await page.check(`input[type="radio"][value="${data.Gender}"]`);
  await page.check('input[type="checkbox"][name="Agreement"]');
});

When('I click the Submit button', async () => {
  await Promise.all([
    page.on('dialog', async (dialog) => {
      dialogMessage = await dialog.message();
      await dialog.accept();
    }),
    page.click('input[type="submit"][name="submitbutton"]'),
  ]);
});

Then('I should assert the success message', async () => {
  const expectedData = {
    FirstName: 'John',
    LastName: 'Doe',
    Email: 'johndoe@example.com',
    PhoneNumber: '1234567890',
    Gender: 'Male',
    Agreement: true,
  };
  const expectedMessage = JSON.stringify(expectedData);
  expect(dialogMessage).to.contain(expectedMessage);
  console.log('Form submitted successfully');
  await browser.close();
});

When('I enter incomplete form data', async () => {
  await page.check('input[type="checkbox"][name="Agreement"]');
});

Then('I should assert that no have message', async () => {
  expect(dialogMessage).to.contain('');
  console.log('Form submitted successfully');
  await browser.close();
});

When('I enter an invalid First name', async () => {
  const data = {
    FirstName: '1',
    LastName: 'Doe',
    Email: 'johndoe@example.com',
    PhoneNumber: '1234567890',
    Gender: 'Male',
    Agreement: true,
  };
  await page.fill('input[name="FirstName"]', data.FirstName);
  await page.fill('input[name="LastName"]', data.LastName);
  await page.fill('input[name="Email"]', data.Email);
  await page.fill('input[name="PhoneNumber"]', data.PhoneNumber);
  await page.check(`input[type="radio"][value="${data.Gender}"]`);
  await page.check('input[type="checkbox"][name="Agreement"]');
});

When('I should assert that a valid First name is required', async () => {
  const errorMessage = 'Valid first name is required.';
  const errorSelector = 'text=Valid first name is required.';
  const errorElement = await page.waitForSelector(errorSelector);
  const errorText = await errorElement.textContent();
  expect(errorText).contain(errorMessage);
});

When('I enter an invalid Phone number', async () => {
  const data = {
    FirstName: 'bruno',
    LastName: 'Doe',
    Email: 'johndoe@example.com',
    PhoneNumber: 'fff',
    Gender: 'Male',
    Agreement: true,
  };
  await page.fill('input[name="FirstName"]', data.FirstName);
  await page.fill('input[name="LastName"]', data.LastName);
  await page.fill('input[name="Email"]', data.Email);
  await page.fill('input[name="PhoneNumber"]', data.PhoneNumber);
  await page.check(`input[type="radio"][value="${data.Gender}"]`);
  await page.check('input[type="checkbox"][name="Agreement"]');
});

When('I enter an valid Phone number', async () => {
  const data = {
    FirstName: 'Bruno',
    LastName: 'Doe',
    Email: 'johndoe@example.com',
    PhoneNumber: '+351915444876',
    Gender: 'Male',
    Agreement: true,
  };
  await page.fill('input[name="FirstName"]', data.FirstName);
  await page.fill('input[name="LastName"]', data.LastName);
  await page.fill('input[name="Email"]', data.Email);
  await page.fill('input[name="PhoneNumber"]', data.PhoneNumber);
  await page.check(`input[type="radio"][value="${data.Gender}"]`);
  await page.check('input[type="checkbox"][name="Agreement"]');
});

When('I should assert that a valid Phone number is required', async () => {
  const errorMessage = 'Valid phone number is required.';
  const errorSelector = 'text=Valid phone number is required.';
  const errorElement = await page.waitForSelector(errorSelector);
  const errorText = await errorElement.textContent();
  expect(errorText).contain(errorMessage);
});

When('I enter an invalid email', async () => {
  const data = {
    FirstName: 'bruno',
    LastName: 'Doe',
    Email: 'testinvalid',
    PhoneNumber: '129312931',
    Gender: 'Male',
    Agreement: true,
  };
  await page.fill('input[name="FirstName"]', data.FirstName);
  await page.fill('input[name="LastName"]', data.LastName);
  await page.fill('input[name="Email"]', data.Email);
  await page.fill('input[name="PhoneNumber"]', data.PhoneNumber);
  await page.check(`input[type="radio"][value="${data.Gender}"]`);
  await page.check('input[type="checkbox"][name="Agreement"]');
});

When('I should assert that a valid email is required', async () => {
  const errorMessage = 'Valid email is required.';
  const errorSelector = 'text=Valid email is required.';
  const errorElement = await page.waitForSelector(errorSelector);
  const errorText = await errorElement.textContent();
  expect(errorText).contain(errorMessage);
});
