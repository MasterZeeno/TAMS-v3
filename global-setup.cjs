"use strict";

import { chromium, expect } from "@playwright/test";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto("https://www.hcc-tams.com.ph/tams/Auth", {
      timeout: 60000,
    });
    await page.locator('input[name="username"]').fill(process.env.USER);
    await page.locator('input[name="password"]').fill(process.env.PASS);
    await page.click('button[type="submit"]');

    await expect(page).toHaveTitle(/profile/i);

    const folderPath = "./.auth";
    const filePath = "/admin.json";
    const fullPath = folderPath + filePath;

    fs.mkdirSync(folderPath, { recursive: true });
    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, "");
    }

    await page.context().storageState({ path: fullPath });
  } catch (error) {
    throw error;
  } finally {
    await browser.close();
  }
}

module.exports = globalSetup;
