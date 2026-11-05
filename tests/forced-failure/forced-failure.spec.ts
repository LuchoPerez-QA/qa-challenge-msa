import { test, expect } from '../../fixtures/test';

test('FORCED-FAILURE-001 - Validación de captura automática ante una falla', async ({ page }) => {

  // Precondiciones
  await page.goto('https://demowebshop.tricentis.com');

  // Validación deliberadamente incorrecta
  await expect(page.locator('h1'))
    .toHaveText('Texto inexistente para provocar una falla');

});