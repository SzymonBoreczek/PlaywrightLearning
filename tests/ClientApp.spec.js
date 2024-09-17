const {test, expect} = require('@playwright/test');

test('Client ecommerce Playwright test', async ({browser, page})=>
    {
        const productName = 'IPHONE 13 PRO';
        const userName = page.locator('#userEmail');
        const passwordField = page.locator('#userPassword');
        const signIn = page.locator('#login'); 
        const products = page.locator('.card-body');
        const creditcard = "2137 2115 2137 2115";
        
        await page.goto('https://rahulshettyacademy.com/client');
        await userName.fill("gaming@gmail.com");
        await passwordField.fill("KochamGaming1");
        await signIn.click();
        await page.waitForLoadState('networkidle');
        // alternative way  page.locator('.card-body b').first().waitFor();
        const cardTitles = await page.locator('.card-body b').allTextContents();
        console.log(cardTitles);
        const count = await products.count();
        for(let i = 0; i < count; ++i)
        {
            if(await products.nth(i).locator("b").textContent() === productName)
            {
                //add to cart
                await products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
        // IPHONE 13 PRO
        await page.locator("[routerlink*='cart']").click();
        await page.locator("div li").first().waitFor();
        const bool = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible();
        expect(bool).toBeTruthy();

        await page.locator("button[type='button']").last().click();
        await page.locator("input.input.txt.text-validated").first.fill(creditcard);
        await page.locator("input[placeholder*='Country']").pressSequentially('pol');
        const dropdown = await page.locator('.ta-results');
        await dropdown.waitFor("button");
        const optionsCount = await dropdown.locator("button").count();
        for(let i = 0; i < optionsCount; ++i)
        {
            const text = await dropdown.locator("button").nth(i).textContent();
            if(text.trim() === "Poland")
            {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }
        await page.pause();
    });