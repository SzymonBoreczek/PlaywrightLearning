const {test, expect} = require('@playwright/test');

test('Client ecommerce Playwright test', async ({browser, page})=>
    {
        const productName = 'IPHONE 13 PRO';
        const userName = page.locator('#userEmail');
        const passwordField = page.locator('#userPassword');
        const signIn = page.locator('#login'); 
        const products = page.locator('.card-body');
        
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
    });