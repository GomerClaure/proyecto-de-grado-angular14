import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('mesero');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('12345678');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('button', { name: 'Notificaciones' }).click();
  await page.getByRole('link', { name: 'Ver todas ' }).click();
  await page.getByRole('link', { name: 'Mitchel creó un pedido hace' }).click();
});