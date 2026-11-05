import { test, expect } from '../../../fixtures/test';
// Caso de prueba 001
test('AUTO-LOG-001 - Login exitoso de usuario', async ({ loginPage }) => {
  // Datos de prueba
  const user = {
    email: 'lucho@perez.com',
    password: 'test123!'
  };

  // Precondiciones
  await loginPage.navigateToLogin();

  // Pasos de ejecución
  await loginPage.fillEmail(user.email);
  await loginPage.fillPassword(user.password);
  await loginPage.clickLogin();

  // Validaciones
  await expect(loginPage.getAccountLink())
    .toContainText(user.email);
});

//Caso de prueba 002

test('AUTO-LOG-002 - Autenticacion fallida con credenciales incorrectas', async ({ loginPage }) => {
  // Datos de prueba
  const user = {
    email: 'lucho@perez.com',
    password: 'asd123!'
  };

  // Precondiciones
  await loginPage.navigateToLogin();

  // Pasos de ejecución
  await loginPage.fillEmail(user.email);
  await loginPage.fillPassword(user.password);
  await loginPage.clickLogin();

  // Validaciones
  await expect(loginPage.getLoginErrors())
    .toContainText('The credentials provided are incorrect');
});