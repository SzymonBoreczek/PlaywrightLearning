import {test, expect} from '@playwright/test';

test('Playwright Special locators', async ({page}) =>
{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("gaming253");
    await page.getByRole("button", {name: 'Submit'}).click();
    expect(await page.getByText("Success! The Form has been submitted successfully!.").isVisible()).toBeTruthy();
    await page.getByRole("link", {name: "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

});