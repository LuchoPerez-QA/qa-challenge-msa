import type { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Localizadores
  private readonly email = '#Email';
  private readonly password = '#Password';
  private readonly loginButton = 'input.button-1.login-button';
  private readonly accountLink = '.account';

  // Navegación
  async navigateToLogin() {
    await this.navigate('/login');
  }

  // Acciones
  async fillEmail(value: string) {
    await this.page.locator(this.email).fill(value);
  }

  async fillPassword(value: string) {
    await this.page.locator(this.password).fill(value);
  }

  async clickLogin() {
    await this.page.locator(this.loginButton).click();
  }

  // Información de respuesta
  getLoginErrors() {
  return this.page.locator('.validation-summary-errors');
}

  getAccountLink() {
  return this.page.locator('.header-links .account').filter({
    hasText: /@/
    
  });
  
}
}