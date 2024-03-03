import { expect, test } from "@playwright/test";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

test("collectData", async ({ page }) => {
  const defTimeOut = 10 * 1000;
  await page.goto("https://hcc-tams.com.ph/tams/filing/overtime/");
  await expect(page).toHaveTitle(/TAMSv2/);
  await expect(page.locator("table")).toBeVisible({ timeout: defTimeOut });

  const headers = [];
  for (const head of await page.locator("table thead tr th").all()) {
    const h = await head.innerText();
    headers.push(h);
  }
  headers.pop();

  const row_data = [];

  for (let i = 1; i <= 3; i++) {
    let counter = 0;
    await expect(page.locator("table")).toBeVisible();
    for (const row of await page.locator("table tbody tr").all()) {
      await expect(row).toBeVisible();
      const columns = await row.locator("td").all();
      const data = [];
      let cntr = 0;
      for (const col of columns) {
        await expect(col).toBeVisible();
        const col_data = await col.innerText();
        if (col_data) {
          const new_col = col_data.trim();
          const header = headers[cntr];
          cntr++;
          const data_content = { [header]: new_col };
          data.push(data_content);
        }
      }
      data.pop();
      counter++;
      const row_header = `Page ${i} | Row ${counter}`;
      row_data.push({ [row_header]: data });
    }
    await page.locator("li.paginate_button.next a").click();
  }

  const outputArray = JSON.stringify(row_data, null, 2);
  const outputFile = "./test-results/output.json";
  fs.writeFileSync(outputFile, outputArray);
  await page.waitForTimeout(defTimeOut);
});