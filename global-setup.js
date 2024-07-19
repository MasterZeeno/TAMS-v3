"use strict";
const { chromium, expect } = require("@playwright/test");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('https://www.hcc-tams.com.ph/tams/Auth', { timeout: 60000 });
    await page.type('input[name="username"]', '15913');
    await page.type('input[name="password"]', '546609529');
    await page.click('button[type="submit"]');

    console.log("Waiting for profile page to load...");
    await expect(page).toHaveTitle(/profile/i);

    console.log("Saving authentication state...");
    const folderPath = "./.auth";
    const filePath = "/admin.json";
    const fullPath = folderPath + filePath;

    fs.mkdirSync(folderPath, { recursive: true });
    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, "");
    }

    await page.context().storageState({ path: fullPath });
    console.log("Authentication state saved successfully.");
  } catch (error) {
    console.error('Error during global setup:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

module.exports = globalSetup;
