import { Browser, Page, firefox, expect } from "@playwright/test"
import dotenv from "dotenv"
dotenv.config()

async function globalSetup() {
  const browser: Browser = await firefox.launch()
  const context = await browser.newContext()
  const page: Page = await context.newPage()
  await page.goto(String(process.env.BASE_URL))
  await page.getByPlaceholder(/username/i).fill(String(process.env.COMP_ID))
  await page.getByPlaceholder(/password/i).fill(String(process.env.PASSWORD))
  await page.getByRole("button", { name: /sign in/i }).click()
  await expect(page.locator("#lastname")).toBeVisible()
  await page.context().storageState({ path: "./.auth/admin.json" })
  await browser.close()
}

export default globalSetup