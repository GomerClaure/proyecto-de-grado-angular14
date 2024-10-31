import { test, expect } from '@playwright/test';

test('Visualizar el pedido del mesero', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('mesero');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('12345678');
  await page.locator('input[type="password"]').press('Enter');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  //Se ve la lista de pedidos del mesero
  await page.getByRole('link', { name: 'Lista de Pedidos' }).click();
});
test('Visualizar lista de pedidos en cocina', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('cocinero');
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill('12345678');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await page.locator('form span').click();
    await page.locator('form i').click();
    await page.getByRole('tab', { name: 'Mostrar detalle' }).click();
    });
test('Registrar datos de cuenta de mesa', async ({ page }) => {
      await page.goto('http://localhost:4200/');
      await page.getByRole('link', { name: 'Login' }).click();
      await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
      await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('mesero');
      await page.locator('input[type="password"]').click();
      await page.locator('input[type="password"]').fill('12345678');
      await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
      await page.getByRole('link', { name: 'Lista de Pedidos' }).click();
      await page.getByRole('button', { name: 'Cuenta' }).click();
      await page.getByRole('textbox').first().click();
      await page.getByRole('textbox').first().fill('Arrazola');
      await page.getByRole('textbox').nth(1).click();
      await page.getByRole('textbox').nth(1).fill('5924805');
      await page.getByRole('button', { name: 'Enviar' }).click();
      await page.waitForSelector('text=Los datos se registraron correctamente', { timeout: 10000 });
      const confirmationMessage = await page.locator('text=Los datos se registraron correctamente');
      expect(await confirmationMessage.isVisible()).toBe(true);
});
test('Visualizar cuentas en caja por número de mesa ', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('cajero');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('12345678');
  await page.locator('input[type="password"]').press('Enter');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('button', { name: 'Cuentas' }).click();
  await page.getByRole('link', { name: 'Pedidos' }).click();
});
test('Cerrar cuenta de una mesa', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('cajero');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('12345678');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('button', { name: 'Cuentas' }).click();
  await page.getByRole('link', { name: 'Pedidos' }).click();
  await page.getByRole('button', { name: 'Cerrar' }).click();
  await page.waitForSelector('text=Se cerro la cuenta correctamente', { timeout: 10000 });
  const confirmationMessage = await page.locator('text=Se cerro la cuenta correctamente');
  expect(await confirmationMessage.isVisible()).toBe(true);
});
test('Visualizar pedido en cocina', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('cocinero');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('12345678');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('link', { name: 'Ver pedidos' }).click();
  //Aparecen los pedidos que realizo el mesero 
  await page.locator('div').filter({ hasText: /^Mesa: Mesa 2Tipo: localEstado: Servido$/ }).first().click();
});
test('Cambiar estado de un pedido', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('cocinero');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('12345678');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('link', { name: 'Ver pedidos' }).click();
  await page.getByText('Mesa: Mesa 4Tipo: localEstado').click();
  //Aparecen las opciones para cambiar el estado en curso y despues a terminado 
  await page.getByRole('button', { name: 'En Curso' }).click();
  await page.getByRole('button', { name: 'Terminado' }).click();
}); 
test('Emitir un reporte de los pedidos realizados en el dia', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  // Realiza el proceso de inicio de sesión
  await page.getByRole('link', { name: 'Login' }).click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('propietario');
  await page.locator('input[type="password"]').fill('12345678');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  // Navega a la sección de reporte
  await page.getByRole('link', { name: 'Reporte' }).click();
  await page.getByLabel('Fecha de Inicio').fill('2024-10-10');
  await page.getByRole('button', { name: 'Generar Reporte' }).click();
  // Espera a que aparezca el título "Cantidad de Pedidos por Día"
  const pedidosPorDiaTitle = page.locator('h3', { hasText: 'Cantidad de Pedidos por Día' });
  await expect(pedidosPorDiaTitle).toBeVisible({ timeout: 5000 });
});
