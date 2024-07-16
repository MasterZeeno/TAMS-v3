"use strict";
const { firefox, expect } = require("@playwright/test");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

async function globalSetup() {
  const browser = await firefox.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log("Navigating to login page...");
    await page.goto('https://www.hcc-tams.com.ph/tams/Auth/', { timeout: 60000 });

    console.log("Filling in credentials...");
    await page.type('input[name="username"]', process.env.COMP_ID || '15913');
    await page.type('input[name="password"]', process.env.PASSWORD || '546609529');
    await page.click('button:has-text("Sign in")');

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
