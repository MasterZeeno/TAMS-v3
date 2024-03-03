import { Page, chromium, expect } from "@playwright/test";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

async function globalSetup() {
  
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://hcc-tams.com.ph/tams/Auth/");
  await page.fill('input[placeholder="Username"]', process.env.COMP_ID);
  await page.fill('input[placeholder="Password"]', process.env.PASSWORD);
  await page.click('button:has-text("Sign in")');
  await expect(page).toHaveTitle(/profile/i);
  
  const fldr = "./.auth";
  const file = "/admin.json";
  const fullStr = fldr.concat(file);

  fs.mkdirSync(fldr, { recursive: true });
  if (!fs.existsSync(fullStr)) {
    fs.writeFileSync(fullStr, "");
  }

  await page.context().storageState({ path: fullStr });

  await browser.close();
}

export default globalSetup;