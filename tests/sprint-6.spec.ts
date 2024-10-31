import { test, expect } from '@playwright/test';
test('Registrar formulario pre-registro de propietarios', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Registro' }).click();
  await page.getByPlaceholder('La Casa de las Empanadas').click();
  await page.getByPlaceholder('La Casa de las Empanadas').fill('Prueba');
  await page.getByPlaceholder('123456789').click();
  await page.getByPlaceholder('123456789').fill('123456789');
  await page.getByPlaceholder('6001234567').click();
  await page.getByPlaceholder('6001234567').fill('65303243');
  await page.getByPlaceholder('restaurante@example.com').click();
  await page.getByPlaceholder('restaurante@example.com').fill('prueba12345678@gmail.com');
  await page.getByRole('button', { name: ' Seleccionar archivo' }).click();
  await page.getByRole('button', { name: ' Seleccionar archivo' }).setInputFiles('prueba.pdf');
  await page.getByRole('button', { name: 'Siguiente' }).click();
  await page.getByText('¡Estás aquí!×+− Leaflet | ©').click();
  await page.getByPlaceholder('Nombre del Propietario').click();
  await page.getByPlaceholder('Nombre del Propietario').fill('Nombre prueba');
  await page.getByPlaceholder('Apellido Paterno').click();
  await page.getByPlaceholder('Apellido Paterno').fill('Apellido prueba');
  await page.getByPlaceholder('Apellido Materno').click();
  await page.getByPlaceholder('Apellido Materno').fill('Cruz');
  await page.getByPlaceholder('Cédula de Identidad').click();
  await page.getByPlaceholder('Cédula de Identidad').fill('5698745');
  await page.getByPlaceholder('Correo Electrónico').click();
  await page.getByPlaceholder('Correo Electrónico').fill('PruebaPropietario@gmail.com');
  await page.getByPlaceholder('Número de mesas').click();
  await page.getByPlaceholder('Número de mesas').fill('2');
  await page.getByRole('button', { name: ' Seleccionar foto' }).click();
  await page.getByRole('button', { name: ' Seleccionar foto' }).setInputFiles('foto_cv_lc_es_7.jpg');
  await page.getByRole('button', { name: 'Enviar' }).click();
  await page.waitForSelector('text=Formulario enviado correctamente', { timeout: 10000 });
  const confirmationMessage = await page.locator('text=Formulario enviado correctamente');
  expect(await confirmationMessage.isVisible()).toBe(true);
});







