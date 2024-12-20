import { test, expect } from '@playwright/test';
test.describe('Sprint 1', () => {
  test('Registrar un platillo exitosamente', async ({ page }) => {
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
    //await page.locator('select[formControlName="categoria"]').selectOption({ index: -1 });
    //await page.locator('input[type="file"][id="img-registrar-platillo"]').setInputFiles('');
    // Hacer clic en el botón "Registrar"
    await page.click('button[type="submit"]');
    // Verificar el mensaje de notificación general
    await page.waitForSelector('text=Por favor, complete el formulario', { timeout: 5000 });
    // Verifica que el mensaje es visible
    const notificationMessage = await page.locator('text=Por favor, complete el formulario');
    expect(await notificationMessage.isVisible()).toBe(true);
  });
  test('Editar un platillo exitosamente', async ({ page }) => {
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
    //Editar los datos y guardarlos
    await page.fill('input[id="NombrePlatillo"]', 'Asado Confirmado');
    await page.fill('input[formControlName="precio"]', '150');
    await page.fill('textarea[formControlName="descripcion"]', 'Descripcion confirmada');
    //Guardar cambios
    await page.click('button[type="submit"]');
    await page.waitForSelector('text=Platillo actualizado con exito', { timeout: 10000 });
    const confirmationMessage = await page.locator('text=Platillo actualizado con exito');
    expect(await confirmationMessage.isVisible()).toBe(true);
  });
  test('Editar platillo manejo de errores formulario', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('propietario');
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill('12345678');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await page.getByLabel('Close').click();
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.getByRole('link', { name: 'Lista de platillos' }).click();
    await page.getByRole('row', { name: 'Anticucho cambio Comida 39' }).getByRole('button').first().click();
    await page.locator('div').filter({ hasText: /^Nombre del platillo$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Nombre del platillo$/ }).getByRole('textbox').fill('');
    await page.getByRole('button', { name: 'Actualizar' }).click();
    // Verificar la confirmación
    await page.waitForSelector('text=Error al editar', { timeout: 10000 });
    const confirmationMessage = await page.locator('text=Error al editar');
    expect(await confirmationMessage.isVisible()).toBe(true);
  });
  test('Eliminar platillo', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('propietario');
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill('12345678');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await page.getByLabel('Close').click();
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.getByRole('link', { name: 'Lista de platillos' }).click();
    await page.getByRole('row', { name: 'Asado Comida 100 ' }).getByRole('button').nth(1).click();
    await page.getByRole('button', { name: 'Aceptar' }).click();
    await page.getByLabel('Close').click();
    await page.waitForSelector('text=Platillo eliminado', { timeout: 10000 });
    const confirmationMessage = await page.locator('text=Platillo eliminado');
    expect(await confirmationMessage.isVisible()).toBe(true);
  }); 
  test('Visualizar lista de platillos', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.locator('div').filter({hasText:/^Nombre$/}).getByRole('textbox').click();
    await page.locator('div').filter({hasText:/^Nombre$/}).getByRole('textbox').fill('propietario');
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill('12345678');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    // Navegar por el menú hasta la lista de platillos
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.getByRole('link', { name: 'Lista de platillos' }).click();
    // Esperar a que la lista de platillos sea visible
    await page.waitForSelector('table', { timeout: 10000 });
  });
  test('Filtrar un platillo', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('propietario');
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill('12345678');
    await page.locator('input[type="password"]').press('Enter');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.getByRole('link', { name: 'Lista de platillos' }).click();
    await page.getByPlaceholder(' Buscar por nombre o').click();
    await page.getByPlaceholder(' Buscar por nombre o').fill('camba');
    // Verificar que "Camba" sea el primer resultado
    //const firstRow = await page.getByRole('row', { name: 'Camba' }).first();
    //expect(await firstRow.isVisible()).toBe(true);
  });
  test('Registrar categoria', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('propietario');
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill('12345678');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await page.getByRole('button', { name: 'Registro' }).click();
    await page.getByText('Registrar categoría', { exact: true }).click();
    await page.getByLabel('Nombre de la Categoría').click();
    await page.getByLabel('Nombre de la Categoría').fill('Categoria de prueba');
    await page.getByText('Seleccionar Imagen').click();
    const filePath = 'C:\\Users\\Karis\\Desktop\\Prueba.jpg';
    await page.locator('input[type="file"][id="archivo"]').setInputFiles(filePath);
    await page.getByRole('button', { name: 'Registrar' }).click();
    await page.getByLabel('Categoria registrada').click();
    await page.waitForSelector('text=Categoria registrada correctamente', { timeout: 10000 });
    const confirmationMessage = await page.locator('text=Categoria registrada correctamente');
    expect(await confirmationMessage.isVisible()).toBe(true);
  });
  test('Registrar categoria manejo de errores envio de formulario vacio', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('propietario');
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill('12345678');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await page.getByRole('button', { name: 'Registro' }).click();
    await page.getByText('Registrar categoría', { exact: true }).click();
    await page.getByLabel('Nombre de la Categoría').click();
    await page.getByLabel('Nombre de la Categoría').fill('Categoria de prueba');
    await page.getByText('Seleccionar Imagen').click();
    const filePath = 'C:\\Users\\Karis\\Desktop\\Prueba.jpg';
    await page.locator('input[type="file"][id="archivo"]').setInputFiles(filePath);
    await page.getByRole('button', { name: 'Registrar' }).click();
    await page.getByLabel('Categoria registrada').click();
    await page.waitForSelector('text=Categoria registrada correctamente', { timeout: 10000 });
    const confirmationMessage = await page.locator('text=Categoria registrada correctamente');
    expect(await confirmationMessage.isVisible()).toBe(true);
  });
  test('Editar una categoria', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('propietario');
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill('12345678');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.getByRole('link', { name: 'Lista de categorías' }).click();
    await page.locator('div:nth-child(7) > .card > .card-body > .mt-auto > .row > div > .btn').first().click();
    await page.getByRole('textbox').click();
    await page.fill('input[id="categoriaInput"]', 'categoria modificada');
    await page.getByRole('button', { name: 'Guardar' }).click();
    await page.waitForSelector('text=Categoria editada correctamente', { timeout: 10000 });
    const confirmationMessage = await page.locator('text=Categoria editada correctamente');
    expect(await confirmationMessage.isVisible()).toBe(true);
  });
  test('Editar una categoria manejo de errores', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('propietario');
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill('12345678');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.getByRole('link', { name: 'Lista de categorías' }).click();
    await page.locator('div:nth-child(7) > .card > .card-body > .mt-auto > .row > div > .btn').first().click();
    await page.getByRole('textbox').click();
    await page.fill('input[id="categoriaInput"]', 'categoria modificada');
    await page.getByRole('button', { name: 'Guardar' }).click();
    await page.waitForSelector('text=Categoria editada correctamente', { timeout: 10000 });
    const confirmationMessage = await page.locator('text=Categoria editada correctamente');
    expect(await confirmationMessage.isVisible()).toBe(true);
  });
  test('Eliminar Categoria', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Nombre$/ }).getByRole('textbox').fill('propietario');
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill('12345678');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await page.getByRole('button', { name: 'Registro' }).click();
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.getByRole('link', { name: 'Lista de categorías' }).click();
    await page.locator('div:nth-child(3) > .btn').first().click();
    await page.getByRole('button', { name: 'Aceptar' }).click();
    await page.waitForSelector('text=Categoria eliminada correctamente', { timeout: 10000 });
    const confirmationMessage = await page.locator('text=Categoria eliminada correctamente');
    expect(await confirmationMessage.isVisible()).toBe(true);
  });
});
