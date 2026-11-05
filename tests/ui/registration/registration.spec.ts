import { test, expect } from '../../../fixtures/test';

// Caso de prueba 001 

test('AUTO-REG-001 - Registro exitoso de usuario', async ({ registrationPage }) => {

  // Datos de prueba
  const timestamp = Date.now();

  const user = {
    firstName: 'Lucho',
    lastName: 'Perez',
    email: `Lucho.prueba.${timestamp}@test.com`,
    password: 'QaTest123!'
  };

  // Precondiciones
  await registrationPage.navigateToRegistration();

  // Pasos de ejecución
  await registrationPage.selectMaleGender();

  await registrationPage.fillFirstName(user.firstName);

  await registrationPage.fillLastName(user.lastName);

  await registrationPage.fillEmail(user.email);

  await registrationPage.fillPassword(user.password);

  await registrationPage.fillConfirmPassword(user.password);

  await registrationPage.clickRegister();

  // Validaciones
  await expect(registrationPage.getRegistrationResult())
    .toHaveText('Your registration completed');

});


// caso de prueba 002
test('AUTO-REG-002 - Rechazo de registro con email existente', async ({ registrationPage }) => {

  // Datos de prueba
  const user = {
    firstName: 'QA',
    lastName: 'Auto',
    email: 'lucho@perez.com',
    password: 'QaTest123!'
  };

  // Precondiciones
  await registrationPage.navigateToRegistration();

  // Pasos de ejecución
  await registrationPage.selectMaleGender();

  await registrationPage.fillFirstName(user.firstName);

  await registrationPage.fillLastName(user.lastName);

  await registrationPage.fillEmail(user.email);

  await registrationPage.fillPassword(user.password);

  await registrationPage.fillConfirmPassword(user.password);

  await registrationPage.clickRegister();

  // Validaciones
  await expect(registrationPage.getRegistrationErrors())
    .toContainText('The specified email already exists');

});