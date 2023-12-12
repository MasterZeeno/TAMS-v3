// @ts-check
import { expect, test } from "@playwright/test";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

test("login", async ({ page }) => {
  // await page.goto("/tams/App")
  // await page.locator("li#menu_ot a").click()
  await page.goto("/tams/filing/overtime");
  // await expect(page.locator("paginate_button next")).toBeVisible()
  await expect(page.locator("table")).toBeVisible();
  const headers = [];
  console.log(
    Number(await page.locator("li.paginate_button a").last().textContent())
  );
  for (const head of await page.locator("table thead tr th").all())
    headers.push(await head.textContent());
  headers.pop();
  const row_data = [];
  var counter = 0;
  for (const row of await page.locator("table tbody tr").all()) {
    await expect(row).toBeVisible();
    const columns = await row.locator("td").all();
    const data = [];
    var cntr = 0;
    for (const col of columns) {
      await expect(col).toBeVisible();
      const col_data = await col.textContent();
      if (col_data !== undefined && col_data !== null) {
        const new_col = await col_data
          .toString()
          .replace(/(\r\n|\n|\r|\t|\n\t|\t\t|\s\s)/gm, "")
          .trim();
        const header = String(headers[cntr]);
        cntr++;
        const data_content = { [header]: new_col };
        data.push(data_content);
      }
    }
    data.pop();
    counter++;
    const row_header = "Row " + counter;
    row_data.push({ [row_header]: data });
  }
  const outputArray = JSON.stringify(row_data, null, 2);
  const outputFile = "./test-results/output.json";
  fs.writeFileSync(outputFile, outputArray);
  await page.waitForTimeout(3000);
});
