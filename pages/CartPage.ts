import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Localizadores
  private readonly addToCartButton = '.product-item input[value="Add to cart"]';
  private readonly cartLink = '.header-links a.ico-cart';
  private readonly cartItems = '.cart-item-row';
  private readonly updateCartButton = 'input[name="updatecart"]';
  private readonly removeFromCartCheckbox = 'input[name="removefromcart"]';
  private readonly emptyCartMessage = '.order-summary-content';

  // Navegación
  async navigateToHome() {
    await this.navigate('/');
  }

  async navigateToCart() {
    await this.page.locator(this.cartLink).click();
  }

  // Acciones
 
  async addCheapComputerToCart() {
    await this.navigate('/build-your-cheap-own-computer');

    // Configuración del producto
    await this.page.locator('#product_attribute_72_5_18_53').check();
    await this.page.locator('#product_attribute_72_6_19_54').check();
    await this.page.locator('#product_attribute_72_3_20_57').check();

    // Cantidad
    await this.page.locator('#addtocart_72_EnteredQuantity').fill('1');

    // Agregar al carrito
    await this.page.locator('#add-to-cart-button-72').click();

    // Esperar confirmación del sistema
    await this.page.locator('.bar-notification.success').waitFor({
      state: 'visible',
      timeout: 10000
    });
  };

  // Información del producto
  
  getProductName() {
  return this.page.locator(this.cartItems).first().locator('a.product-name');
}

  getProductPrice() {
    return this.page.locator(this.cartItems).first().locator('.product-unit-price');
  }

  getProductQuantity() {
    return this.page.locator(this.cartItems).first().locator('.qty-input');
  }

  getProductTotal() {
    return this.page.locator(this.cartItems).first().locator('.product-subtotal');
  }

  // Modificación de cantidad
async updateProductQuantity(quantity: string) {
  await this.getProductQuantity().fill(quantity);
  await this.page.locator(this.updateCartButton).click();
}

// Eliminación de producto
async removeProductFromCart() {
  await this.page.locator(this.removeFromCartCheckbox).first().check();
  await this.page.locator(this.updateCartButton).click();
}

// Estado del carrito
getEmptyCartMessage() {
  return this.page.locator(this.emptyCartMessage);
}
}