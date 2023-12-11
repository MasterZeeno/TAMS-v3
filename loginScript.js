const { chromium } = require('playwright');
require('dotenv').config(); // Load environment variables from .env file

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

(async () => {
  // Launch the browser
  const browser = await chromium.launch();

  // Create a new page
  const page = await browser.newPage();

  // Navigate to the website
  await page.goto('https://hcc-tams.com.ph/');

  // Click on the login button or any element that leads to the login page
  await page.click('your-login-button-selector');

  // Wait for the login page to load
  await page.waitForSelector('your-username-input-selector');

  // Fill in the credentials and submit the form
  await page.fill('your-username-input-selector', USERNAME);
  await page.fill('your-password-input-selector', PASSWORD);
  await page.click('your-login-submit-button-selector');

  // Wait for login to complete (adjust the selector as needed)
  await page.waitForSelector('your-logged-in-element-selector');

  // Take a screenshot or perform additional actions if needed
  await page.screenshot({ path: 'login-screenshot.png' });

  // Close the browser
  await browser.close();
})();
