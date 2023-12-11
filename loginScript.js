const { chromium } = require('playwright');
require('dotenv').config(); // Load environment variables from .env file

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const TAMS_WEBSITE = "https://hcc-tams.com.ph/";

(async () => {
  // Launch the browser
  const browser = await chromium.launch();

  // Create a new page
  const page = await browser.newPage();

  try {
    // Navigate to the website
    await page.goto(TAMS_WEBSITE);

    // Wait for the login page to load
    await page.waitForSelector('input[type="text"][name="username"]');
    await page.fill('input[type="text"][name="username"]', USERNAME);

    await page.waitForSelector('input[type="password"][name="password"]');
    await page.fill('input[type="password"][name="password"]', PASSWORD);

    await Promise.all([
      page.waitForNavigation(), // Wait for navigation after clicking the submit button
      page.click('button[type="submit"]'),
    ]);

    // Wait for login to complete (adjust the selector as needed)
    await page.waitForSelector('#employee_id');
    const loggedInUser = await page.$eval('#employee_id', (el) => el.value);
    
    // Assert that the logged-in user matches the provided username
    expect(loggedInUser).toBe(USERNAME);

    // Take a screenshot or perform additional actions if needed
    await page.screenshot({ path: './screenshots/login-screenshot.png' });
  } catch (error) {
    console.error('Error during login:', error);
  } finally {
    // Close the browser
    await browser.close();
  }
})();
