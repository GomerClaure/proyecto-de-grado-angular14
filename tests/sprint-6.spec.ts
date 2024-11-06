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
test('Visualizar formularios de pre-registros de restaurantes recibidos', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('administrador');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('12345678');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.locator('form i').click(); 
  await page.getByRole('link', { name: 'Solicitudes' }).click();
  //Aparece la prueba que se realizo como solicitud de restaurante 
  await page.getByRole('row', { name: '1 Prueba 123456789 Nombre' }).getByRole('button').click();
});
test('Validar formulario de pre-registro de restaurantes', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('administrador');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('12345678');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('link', { name: 'Solicitudes' }).click();
  await page.getByRole('row', { name: '1 Prueba 123456789 Nombre' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Aceptar' }).click();
  await page.waitForSelector('text=Se acepto la solicitud', { timeout: 10000 });
  const confirmationMessage = await page.locator('text=Se acepto la solicitud');
  expect(await confirmationMessage.isVisible()).toBe(true);
});
test('Dar de Baja a un propietario', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('administrador');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('12345678');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('link', { name: 'Propietarios' }).click();
  await page.locator('.card-img-container').first().click();
  await page.getByRole('button', { name: 'Dar de Baja' }).click();
  await page.waitForSelector('text=Se dio de baja la cuenta del propietario', { timeout: 10000 });
  const confirmationMessage = await page.locator('text=Se dio de baja la cuenta del propietario');
  expect(await confirmationMessage.isVisible()).toBe(true);
});
test('Dar de Alta a un propietario', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('administrador');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('12345678');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  await page.getByRole('link', { name: 'Propietarios' }).click();
  await page.locator('.card-img-container').first().click();
  await page.getByRole('button', { name: 'Dar de Alta' }).click();
  await page.waitForSelector('text=Se dio de alta la cuenta del propietario', { timeout: 10000 });
  const confirmationMessage = await page.locator('text=Se dio de alta la cuenta del propietario');
  expect(await confirmationMessage.isVisible()).toBe(true);
});








