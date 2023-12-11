import { Browser, Page, chromium, expect } from "@playwright/test"
import dotenv from "dotenv"
dotenv.config()

async function globalSetup() {
  const browser: Browser = await chromium.launch()
  const context = await browser.newContext()
  const page: Page = await context.newPage()
  const compID = String(process.env.COMP_ID)
  const password = String(process.env.PASSWORD)
  const base_URL = String(process.env.BASE_URL)
  await page.goto(base_URL)
  await page.getByPlaceholder(/username/i).fill(compID)
  await page.getByPlaceholder(/password/i).fill(password)
  await page.getByRole("button", { name: /sign in/i }).click()
  await expect(page.locator("#lastname")).toBeVisible()
  await page.context().storageState({ path: "./.auth/admin.json" })
  await browser.close()
}

export default globalSetup