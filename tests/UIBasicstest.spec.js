const {test, expect} = require('@playwright/test');


test('Browser Context Playwright test', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    console.log(await page.title());
    //css, xpath
    await userName.fill("SzymonBorixon");
    await page.locator("[type='password']").fill("learning");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    // Fill - wipes the existing content
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

// test.only('Page Playwright test', async ({page})=>   executes only one selected test case
test('Page Playwright test', async ({page})=>
{
    await page.goto("https://google.com");
    //get title - assertion to check if it is correct
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});


test('UI Controls', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const blinkingText = page.locator("[href*='documents-request']");
    const dropdown = page.locator('select.form-control');
    await dropdown.selectOption('consult');
    await page.locator('.customradio').last().click();
    await page.locator('#okayBtn').click();
    console.log(await page.locator('.customradio').last().isChecked());
    await expect(page.locator('.customradio').last()).toBeChecked();
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').last().isChecked()).toBeFalsy();
    await expect(blinkingText).toHaveAttribute('class', 'blinkingText');
    // Second option await page.locator('.customradio').last().isChecked(); returns a boolean value
    //assertion
});

test('Child windows handling', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");

const [newPage] = await Promise.all([ // If two windows are opened with a single click add a new page object to the braces [newPage, newPage2]
    context.waitForEvent('page'), //listen for any new page
    documentLink.click(), //new page is opened
])

const text = await newPage.locator('.red').textContent();
const arrayText = text.split("@");
const domain = arrayText[1].split(" ")[0];
console.log(domain);
await userName.fill(domain);
console.log(await page.locator('#username').textContent());
});



// Playwright recorder npx playwright codegen [Webiste url]