const {test, expect} = require('@playwright/test');

test('Client ecommerce Playwright test', async ({browser, page})=>
    {
        const email = "gaming@gmail.com";
        const productName = 'IPHONE 13 PRO';
        const userName = page.locator('#userEmail');
        const passwordField = page.locator('#userPassword');
        const signIn = page.locator('#login'); 
        const products = page.locator('.card-body');
        const creditcard = page.locator("input[type='text']").first();
        const cvv = page.locator("input[type='text']").nth(1);
        const cardName = page.locator("input[type='text']").nth(2);
        const coupon = page.locator("input[type='text']").nth(3);
        const country = page.locator("input[placeholder*='Country']");
        
        await page.goto('https://rahulshettyacademy.com/client');
        await userName.fill(email);
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
        // Personal information
        await page.locator("[routerlink*='cart']").click();
        await page.locator("div li").first().waitFor();
        const bool = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible();
        expect(bool).toBeTruthy();

        await page.locator("button[type='button']").last().click();
        await creditcard.fill('2137 2115 2137 2115');
        await page.getByRole('combobox').first().selectOption('11');
        await page.getByRole('combobox').nth(1).selectOption('03');
        await cvv.fill('666');
        await cardName.fill('Krzysztof Ibisz');
        await coupon.fill('rahulshettyacademy');
        await page.locator("button[type='submit']").click();


        // Shipping information
        await country.click();
        await country.pressSequentially('pol');
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
        await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
        await page.locator(".action__submit").click();
        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

        await page.locator("td [routerlink*='myorders']").click();
        await page.locator("tbody").waitFor();
        const orderRow = await page.locator("tbody tr");
        for(let i = 0; i < await orderRow.count(); ++i)
        {
            const rowOrderId = await orderRow.nth(i).locator("th").textContent(); 
            if(orderId.includes(rowOrderId))
                {
                    await orderRow.nth(i).locator("button").first().click();
                    break;
                }
        }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
    await page.pause();
    });