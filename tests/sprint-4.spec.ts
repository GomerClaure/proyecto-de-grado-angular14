import { test, expect } from '@playwright/test';

test('Notificar estados del pedido al mesero', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('mesero');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('12345678');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('button', { name: 'Notificaciones' }).click();
  await page.getByRole('link', { name: 'Ver todas ' }).click();
  await page.getByRole('link', { name: 'Micah sirvio un pedido' }).click();
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