import { test, expect } from '@playwright/test';

test.describe('Sprint 1', () => {
  test('Registrar un platillo', async ({ page }) => {
    // Navega a la página de login
    await page.goto('http://localhost:4200/login');
    await page.waitForSelector('form', { state: 'visible' });
    // Llenar el formulario de inicio de sesión
    await page.fill('input[formControlName="usuario"]', 'propietario');
    await page.fill('input[formControlName="password"]', '12345678');
    // Enviar el formulario de inicio de sesión
    await page.click('button[type="submit"]');
    // Esperar la redirección a la página de inicio del propietario
    await page.waitForURL('http://localhost:4200/home');
    // Abrir el dropdown "Registro"
    await page.click('text=Registro');
    await page.waitForSelector('text=Registrar platillo', { state: 'visible' });
    // Seleccionar "Registrar Platillo" del dropdown
    await page.click('text=Registrar platillo');
    await page.waitForURL('http://localhost:4200/propietario/platillo/registrar');
    // Completar el formulario de registro de platillo
    await page.fill('input[id="NombrePlatillo"]', 'Asado');
    await page.locator('select[formControlName="categoria"]').selectOption({ index: 0 });
    await page.fill('input[formControlName="precio"]', '100');
    await page.fill('textarea[formControlName="descripcion"]', 'Descripcion del platillo');
    // Cargar una imagen
    const filePath = 'C:\\Users\\Karis\\Desktop\\Prueba.jpg';
    await page.locator('input[type="file"][id="img-registrar-platillo"]').setInputFiles(filePath);
    // Hacer clic en el botón "Registrar"
    await page.click('button[type="submit"]');
    // Esperar y verificar el mensaje de éxito el Toastr
    await page.waitForSelector('text=Platillo Registrado con exito', { timeout: 10000 });
    // Mensaje que debe ser mostrado
    const successMessage = await page.locator('text=Platillo Registrado con exito');
    // Verifica que el mensaje es visible
    expect(await successMessage.isVisible()).toBe(true); 
  });

  test('Registro de platillo manejo de errores envio del formulario vacío', async ({ page }) => {
    // Navega a la página de login
    await page.goto('http://localhost:4200/login');
    await page.waitForSelector('form', { state: 'visible' });
    // Llenar el formulario de inicio de sesión
    await page.fill('input[formControlName="usuario"]', 'propietario');
    await page.fill('input[formControlName="password"]', '12345678');
    // Enviar el formulario de inicio de sesión
    await page.click('button[type="submit"]');
    // Esperar la redirección a la página de inicio del propietario
    await page.waitForURL('http://localhost:4200/home');
    // Abrir el dropdown "Registro"
    await page.click('text=Registro');
    await page.waitForSelector('text=Registrar platillo', { state: 'visible' });
    // Seleccionar "Registrar Platillo" del dropdown
    await page.click('text=Registrar platillo');
    await page.waitForURL('http://localhost:4200/propietario/platillo/registrar');
    // Dejar los campos vacíos para simular errores de validación
    await page.fill('input[id="NombrePlatillo"]', '');
    await page.fill('input[formControlName="precio"]', '');
    await page.fill('textarea[formControlName="descripcion"]', '');
    await page.locator('select[formControlName="categoria"]').selectOption({ index: -1 });
    await page.locator('input[type="file"][id="img-registrar-platillo"]').setInputFiles('');
    // Hacer clic en el botón "Registrar"
    await page.click('button[type="submit"]');
    // Verificar el mensaje de notificación general
    await page.waitForSelector('text=Por favor, complete el formulario', { timeout: 5000 });
    // Verifica que el mensaje es visible
    const notificationMessage = await page.locator('text=Por favor, complete el formulario');
    expect(await notificationMessage.isVisible()).toBe(true);
  });

  test('Editar un platillo', async ({ page }) => {
    // Navega a la página de login e inicia sesión como en la prueba anterior
    await page.goto('http://localhost:4200/login');
    await page.fill('input[formControlName="usuario"]', 'propietario');
    await page.fill('input[formControlName="password"]', '12345678');
    await page.click('button[type="submit"]');
    await page.waitForURL('http://localhost:4200/home');
    // Navegar a la lista de platillos y luego a la vista de edición de un platillo
    await page.click('text=Menu');
    await page.waitForSelector('text=Lista de platillos', { state: 'visible' });
    await page.waitForURL('http://localhost:4200/propietario/platillo');
  });
});
