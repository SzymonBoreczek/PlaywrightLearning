const {test, expect} = require("@playwright/test");

test("Calendar validations", async ({page})=>
{
    const monthNumber = "3";
    const date = "11";
    const year = "2000";
    const expectedList = [monthNumber, date, year];
    let i = 0;

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    while(i<2)
    {
        await page.locator(".react-calendar__navigation__label").click();  
        i++;  
    }
    i = 0;
    while(i<3)
    {
        await page.locator(".react-calendar__navigation__arrow").nth(1).click();
        i++;
    }
    await page.locator("//button[text()='"+year+"']").click(); 
    await page.locator(".react-calendar__tile").nth(Number(monthNumber)-1).click(); 
    await page.locator("//abbr[text()='11']").click();
    const inputs = await page.locator(".react-date-picker__inputGroup input");
    for(let index = 0; index < inputs.length; index++)
    {
        const value = inputs[index].getAttribute("value");
        expect(value).toEqual(expectedList[index]);
    }

});