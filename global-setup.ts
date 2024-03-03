import { Browser, Page, firefox, expect } from "@playwright/test";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

async function globalSetup() {
  const fldr: String = "./.auth";
  const file: String = "/admin.json";
  const fullStr: String = String(fldr.concat(String(file)));
  fs.mkdirSync(String(fldr), { recursive: true });
  if (!fs.existsSync(String(fullStr))) {
    fs.writeFileSync(String(fullStr), "");
  }
  const browser: Browser = await firefox.launch();
  const context = await browser.newContext();
  const page: Page = await context.newPage();
  await page.goto(String("https://hcc-tams.com.ph/tams/Auth"));
  await page.getByPlaceholder(/username/i).fill(String(process.env.COMP_ID));
  await page.getByPlaceholder(/password/i).fill(String(process.env.PASSWORD));
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveTitle(/profile/i);
  await page.context().storageState({ path: String(fullStr) });
  await browser.close()
}

export default globalSetup;
