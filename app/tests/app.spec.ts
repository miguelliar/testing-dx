// import { test, expect } from '@playwright/test';

// const appUrl = 'http://localhost:5173/';

// test('has title', async ({ page }) => {
//   await page.goto(appUrl);

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Testing DX Chat/);
// });

// test('sending a message', async ({ page }) => {
//   await page.goto(appUrl);

//   // send a message
//   await page.getByRole('textbox').fill('the message we care about');
//   await page.getByRole('button', { name: /Send/i }).click();

//   // Check that the last <dd> contains "hi"
//   const lastMessage = await page.locator('dd').last();
//   await expect(lastMessage).toHaveText('the message we care about');
// });
