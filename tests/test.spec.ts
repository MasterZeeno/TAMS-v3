import { expect, test } from "@playwright/test";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

test("collectData", async ({ page }) => {
  const defTimeOut: number = 10 * 1000;
  await page.goto("https://hcc-tams.com.ph/tams/filing/overtime/");
  await expect(page).toHaveTitle(/TAMSv2/);
  await expect(page.locator("table")).toBeVisible({ timeout: defTimeOut });
  const headers: string[] = [];
  for (const head of await page.locator("table thead tr th").all()) {
    const h: String = String(await head.textContent());
    headers.push(String(h));
  }
  headers.pop();
  const row_data: Record<string, any>[] = [];

  for (let i: number = 1; i <= 3; i++) {
    let counter: number = 0;
    await expect(page.locator("table")).toBeVisible();
    for (const row of await page.locator("table tbody tr").all()) {
      await expect(row).toBeVisible();
      const columns = await row.locator("td").all();
      const data: Record<string, any>[] = [];
      let cntr: number = 0;
      for (const col of columns) {
        await expect(col).toBeVisible();
        const col_data: string | null | undefined = await col.textContent();
        if (col_data !== undefined && col_data !== null) {
          const new_col: string = col_data
            .toString()
            .replace(/(\r\n|\n|\r|\t|\n\t|\t\t|\s\s)/gm, "")
            .trim();
          const header: string = String(headers[cntr]);
          cntr++;
          const data_content: Record<string, any> = { [header]: new_col };
          data.push(data_content);
        }
      }
      data.pop();
      counter++;
      const row_header: string = "Page " + i + " | Row " + counter;
      row_data.push({ [row_header]: data.flat() });
    }
    await page.locator("li.paginate_button.next a").click();
  }
  const outputArray: string = JSON.stringify(row_data, null, 2);
  const outputFile: string = "./test-results/output.json";
  fs.writeFileSync(outputFile, outputArray);
  await page.waitForTimeout(3000);
});
