import { test, expect, request} from '@playwright/test';
const {APIUtils} = require('./utils/APIUtils');
const loginPayLoad = {userEmail: "gaming@gmail.com", userPassword: "KochamGaming1"};
const orderPayLoad = {orders: [{country: "Poland", productOrderedId: "6581ca979fd99c85e8ee7faf"}]};

let response;

test.beforeAll( async ()=>
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad); 
    response = await apiUtils.createOrder(orderPayLoad);

});

//Create order is success
test('Place the order', async ({browser, page})=>
    {
        page.addInitScript(value => {
            window.localStorage.setItem('token', value);
        }, response.token);
        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator("button[routerlink*='myorders']").click();
        await page.locator("tbody").waitFor();
        const orderRow = await page.locator("tbody tr");
        for(let i = 0; i < await orderRow.count(); ++i)
        {
            const rowOrderId = await orderRow.nth(i).locator("th").textContent(); 
            if(response.orderId.includes(rowOrderId))
                {
                    await orderRow.nth(i).locator("button").first().click();
                    break;
                }
        }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
    });