import { expect } from '@playwright/test';
import { test } from '../../../fixtures/test';

// Caso de prueba 001
test('AUTO-CART-001 - Incorporación de productos al carrito', async ({ cartPage }) => {

  // Precondiciones
  await cartPage.navigateToHome();

  // Pasos de ejecución
  await cartPage.addCheapComputerToCart();

  // Navegación al carrito
  await cartPage.navigateToCart();

  // Validaciones
  await expect(cartPage.getProductName())
    .toHaveText('Build your own cheap computer');

  await expect(cartPage.getProductQuantity())
    .toHaveValue('1');

  await expect(cartPage.getProductPrice())
    .toBeVisible();

  await expect(cartPage.getProductTotal())
    .toBeVisible();

});

// Caso de prueba 002

test('AUTO-CART-002 - Modificación de cantidades y eliminación de productos', async ({ cartPage }) => {

  // Precondiciones
  await cartPage.navigateToHome();

  // Pasos de ejecución
  await cartPage.addCheapComputerToCart();
  await cartPage.navigateToCart();

  // Obtener precio unitario
  const unitPriceText = await cartPage.getProductPrice().innerText();
  const unitPrice = Number(unitPriceText.replace(/[^0-9.]/g, ''));

  // Modificación de cantidad
  await cartPage.updateProductQuantity('2');

  // Validaciones de cantidad e importe
  await expect(cartPage.getProductQuantity())
    .toHaveValue('2');

  const totalText = await cartPage.getProductTotal().innerText();
  const total = Number(totalText.replace(/[^0-9.]/g, ''));

  expect(total).toBeCloseTo(unitPrice * 2, 2);

  // Eliminación del producto
  await cartPage.removeProductFromCart();

  // Validación del carrito vacío
  await expect(cartPage.getEmptyCartMessage())
    .toContainText('Your Shopping Cart is empty!');

});