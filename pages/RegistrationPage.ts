import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegistrationPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  // Localizadores
  private readonly genderMale = '#gender-male';
  private readonly firstName = '#FirstName';
  private readonly lastName = '#LastName';
  private readonly email = '#Email';
  private readonly password = '#Password';
  private readonly confirmPassword = '#ConfirmPassword';
  private readonly registerButton = '#register-button';
  private readonly registrationResult = '.result';

  // Navegación
  async navigateToRegistration() {
    await this.navigate('/register');
  }

  // Acciones
  async selectMaleGender() {
    await this.page.locator(this.genderMale).check();
  }

  async fillFirstName(value: string) {
    await this.page.locator(this.firstName).fill(value);
  }

  async fillLastName(value: string) {
    await this.page.locator(this.lastName).fill(value);
  }

  async fillEmail(value: string) {
    await this.page.locator(this.email).fill(value);
  }

  async fillPassword(value: string) {
    await this.page.locator(this.password).fill(value);
  }

  async fillConfirmPassword(value: string) {
    await this.page.locator(this.confirmPassword).fill(value);
  }

  async clickRegister() {
    await this.page.locator(this.registerButton).click();
  }

  // Información de respuesta
  getRegistrationResult() {
    return this.page.locator(this.registrationResult);
  }
  
  getRegistrationErrors() {
  return this.page.locator('.validation-summary-errors');
}
}