import { test as base } from '@playwright/test';

import { RegistrationPage } from '../pages/RegistrationPage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { MercadoLibreService } from '../services/MercadoLibreService';

type Fixtures = {
  registrationPage: RegistrationPage;
  loginPage: LoginPage;
  cartPage: CartPage;
  mercadoLibreService: MercadoLibreService;
};

export const test = base.extend<Fixtures>({
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  mercadoLibreService: async ({ request }, use) => {
    await use(new MercadoLibreService(request));
  },
});

export { expect } from '@playwright/test';