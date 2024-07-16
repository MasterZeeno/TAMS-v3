"use strict";
const { firefox, expect } = require("@playwright/test");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

async function globalSetup() {
  const browser = await firefox.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.hcc-tams.com.ph/tams/Auth/', { timeout: 60000 });
  await page.fill('input[placeholder="Username"]', process.env.COMP_ID || "");
  await page.fill('input[placeholder="Password"]', process.env.PASSWORD || "");
  await page.click('button:has-text("Sign in")');

  await expect(page).toHaveTitle(/profile/i);

  const folderPath = "./.auth";
  const filePath = "/admin.json";
  const fullPath = folderPath + filePath;

  fs.mkdirSync(folderPath, { recursive: true });
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, "");
  }

  await page.context().storageState({ path: fullPath });

  await browser.close();
}

module.exports = globalSetup;
