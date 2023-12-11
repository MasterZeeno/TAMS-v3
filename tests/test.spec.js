// @ts-check
import { expect, test } from "@playwright/test";

test("login", async ({ page }) => {
  await page.goto("https://hcc-tams.com.ph/tams/", {
    waitUntil: "domcontentloaded",
  });
  await expect(page.locator('#lastname')).toBeVisible( {timeout: 60000} )
  const headers = (await page.locator("table thead tr").allTextContents())
    .map((e) => e.split("\t"))
    .flat()
    .map((e) => e.split("\n"))
    .map((e) => {
      const indi = e.toString();
      const indOf = indi.indexOf(",");
      if (indOf > -1) {
        return indi.substring(0, indOf).trim();
      }
      return e;
    });

  const texts = [];
  const cleantexts = [];
  var counter = 1;

  // const pagination = await page.locator("ul.pagination li a").last()

  for (const row of await page.locator("table tbody tr").all()) {
    const tdtexts = await row.locator("td").allTextContents();
    tdtexts.forEach((val, index) => {
      var val2 = val
        .toString()
        .replace(/(\r\n|\n|\r|\t|\s\s)/gm, "")
        .trim();
      if (index > 0 && index <= 5) {
        if (index <= 3) {
          const dateOnly = val2.substring(0, 10).trim();
          const aOp = val2
            .substring(val2.length - 2)
            .trim()
            .toLocaleLowerCase();
          const noAP = val2.substring(0, val2.length - 2).trim();
          const timeOnly = noAP
            .substring(noAP.lastIndexOf(" "))
            .trim()
            .split(":");
          const hr =
            aOp == "pm" ? Number(timeOnly[0]) + 12 : Number(timeOnly[0]) * 1;
          const dobhr =
            hr.toString().length < 2 ? "0" + hr.toString() : hr.toString();
          const mn =
            typeof timeOnly[1] != "undefined"
              ? timeOnly[1].length < 2
                ? "0" + timeOnly[1]
                : timeOnly[1]
              : "00";
          const raw = dateOnly + "T" + dobhr + ":" + mn + ":00.000Z";
          val2 = new Date(raw).toISOString();
        } else {
          const timee = val2.split(":");
          val2 = (
            Number(timee[0]) * 1 +
            " hour" +
            (Number(timee[0]) * 1 > 1 ? "s" : "") +
            (Number(timee[1]) * 1 > 0
              ? Number(timee[1]) * 1 +
              " minute" +
              (Number(timee[1]) * 1 > 1 ? "s" : "")
              : "")
          ).toString();
        }
      }
      const header = headers[index].toString();
      cleantexts.push({ [header]: val2 });
    });
    counter++;
    const batchNum = "Row " + counter;
    texts.push({ [batchNum]: cleantexts });
  }
  console.table(JSON.stringify(texts));
  await page.waitForTimeout(3000);
  await page.close();
});
