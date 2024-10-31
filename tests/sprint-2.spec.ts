import { test, expect } from '@playwright/test';

test('Visualizar lista de categorias', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('propietario');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('12345678');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('button', { name: 'Menu' }).click();
  await page.getByRole('link', { name: 'Lista de categorías' }).click();
});
test('Editar Menu', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('propietario');
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill('12345678');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.getByRole('link', { name: 'Editar menú' }).click();
    await page.locator('path').first().click();
    await page.getByLabel('', { exact: true }).setInputFiles('Prueba.jpg');
    await page.locator('#check-plat6').uncheck();
    await page.locator('#check-plat6').check();
    await page.getByText('Guardar').click();
    await page.waitForSelector('text=Menu guardado correctamente', { timeout: 10000 });
    const confirmationMessage = await page.locator('text=Menu guardado correctamente');
    expect(await confirmationMessage.isVisible()).toBe(true);
  });
  test('Visualizar mesas', async ({ page }) => {
    await page.locator('body').click();
    await page.goto('http://localhost:4200/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('mesero');
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill('12345678');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await page.getByRole('link', { name: 'Registrar Pedido' }).click();
  });
  test('Registrar pedido', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('mesero');
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill('12345678');
    await page.locator('input[type="password"]').press('Enter');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await page.getByRole('link', { name: 'Registrar Pedido' }).click();
  });
  test('Registrar pedido con ningun platillo seleccionado', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('mesero');
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill('12345678');
    await page.locator('input[type="password"]').press('Enter');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await page.getByRole('link', { name: 'Registrar Pedido' }).click();
  });