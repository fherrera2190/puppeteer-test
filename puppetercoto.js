import puppeteer from "puppeteer";

try {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();

  await page.goto("https://api.cotodigital.com.ar/");

  //Usa el método $x para seleccionar un elemento con XPath
  const element = await page.waitForSelector(
    '::-p-xpath(//input[@id="dropdownMenuClickableInside"])'
  );
  console.log(element);
  await page
    .locator('xpath///input[@id="dropdownMenuClickableInside"]')
    .fill("coca cola");
  await page.keyboard.press("Enter");

  const searchResultSelector = ".productos row";
  await page.waitForSelector(searchResultSelector);
} catch (error) {}
