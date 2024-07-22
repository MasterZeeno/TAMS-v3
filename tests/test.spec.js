"use strict";

import { expect, test } from "@playwright/test";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const BASE_URL = "https://www.hcc-tams.com.ph/tams/filing";
const tableURLs = ["overtime", "leave", "officialbusiness"];

test("collectData", async ({ page }) => {
  await page.goto("https://www.hcc-tams.com.ph/tams/Auth");
  await page.locator('input[name="username"]').fill(process.env.USER);
  await page.locator('input[name="password"]').fill(process.env.PASS);
  await page.click('button[type="submit"]');

  await expect(page).toHaveTitle(/profile/i);

  const row_data = [];

  // await page.goto("https://www.hcc-tams.com.ph/tams/App");
  // await expect(page.locator('input[name="employee_id"]')).toBeVisible();

  for (const url in tableURLs) {
    await page.goto(`${BASE_URL}/${tableURLs[url]}`);
    await expect(page.locator("table")).toBeVisible({ timeout: 60000 });
    const headers = [];
    for (const head of await page.locator("table thead tr th").all()) {
      const h = await head.innerText();
      headers.push(h);
    }

    headers.pop();

    for (const row of await page.locator("table tbody tr").all()) {
      await expect(row).toBeVisible();
      const columns = await row.locator("td").all();
      const data = [];
      var cntr = 0;
      for (const col of columns) {
        await expect(col).toBeVisible();
        const col_data = await col.innerText();
        // if (col_data) {
        const new_col = col_data.trim();
        const header = headers[cntr] ? headers[cntr].replace("\n"," ") : "?";
        cntr++;
        const data_content = { [header]: new_col };
        data.push(data_content);
        // }
      }
      data.pop();
      const row_header = tableURLs[url].toUpperCase();
      row_data.push({ [row_header]: data });
    }
  }

  const outputArray = JSON.stringify(row_data, null, 2);
  const outputFile = "./test-results/output.json";
  fs.writeFileSync(outputFile, outputArray);
  await page.waitForTimeout(6000);

  await page.context().close();
});
