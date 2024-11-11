import puppeteer from "puppeteer";
import fs from "fs";
try {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  await page.goto("https://www.vea.com.ar/");

  const value = await page.evaluate(() => {
    return localStorage.getItem("filteredPromotions");
  });

  fs.writeFileSync(
    "filteredPromotions.json",
    JSON.stringify(JSON.parse(value), null, 2)
  );

  browser.close();
} catch (error) {}
