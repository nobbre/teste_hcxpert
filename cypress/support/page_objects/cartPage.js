/**
 * CartPage - Page Object Model
 * Representa a página do carrinho de compras do Automation Exercise
 */
class CartPage {
  constructor() {
    this.url = "https://www.automationexercise.com/view_cart";
  }

  // Seletores
  elements = {
    cartInfoTable: () => cy.get("#cart_info_table"),
    cartItems: () => cy.get(".cart_info tbody tr"),
    cartItemNames: () => cy.get(".cart_description h4 a"),
    cartViewProductLinks: () => cy.get("#cartModal").contains("a", "View Cart"),
    cartItemPrices: () => cy.get(".cart_price p"),
    cartItemQuantities: () => cy.get(".cart_quantity button"),
    cartItemTotals: () => cy.get(".cart_total_price"),
    deleteButtons: () => cy.get(".cart_quantity_delete"),
    proceedToCheckoutButton: () => cy.contains("Proceed To Checkout"),
    emptyCartMessage: () => cy.get("#empty_cart"),
    registerLoginLink: () => cy.contains("Register / Login"),
    quantityInput: () => cy.get(".cart_quantity button"),
    continueShoppingButton: () => cy.contains("Continue Shopping"),
  };

  // Ações
  visit() {
    cy.visit(this.url);
  }

  proceedToCheckout() {
    this.elements.proceedToCheckoutButton().click();
  }

  removeProductByIndex(index) {
    this.elements.cartItems().eq(index).find(".cart_quantity_delete").click();
    cy.wait(500); // Aguarda remoção
  }

  removeFirstProduct() {
    this.removeProductByIndex(0);
  }

  updateQuantity(productIndex, quantity) {
    // Esta funcionalidade pode variar, não conheço a regra do negócio , mas o campo quantidade encontra-de
    // disabled no momento da edição
    // Pode ser necessário ajustar conforme a funcionalidade real
    this.elements
      .cartItems()
      .eq(productIndex)
      .find(".cart_quantity button")
      .clear()
      .type(quantity);
  }

  getProductNameByIndex(index) {
    return this.elements
      .cartItems()
      .eq(index)
      .find(".cart_description h4 a")
      .invoke("text");
  }

  getProductPriceByIndex(index) {
    return this.elements
      .cartItems()
      .eq(index)
      .find(".cart_price p")
      .invoke("text");
  }

  getProductQuantityByIndex(index) {
    return this.elements
      .cartItems()
      .eq(index)
      .find(".cart_quantity button")
      .invoke("text");
  }

  getTotalPrice() {
    return cy.get(".cart_total_price").invoke("text");
  }

  // Validações
  verifyOnCartPage() {
    cy.url().should("include", "/view_cart");
  }

  verifyProductInCart(productName) {
    this.elements.cartViewProductLinks().click();
    this.elements.cartItemNames().should("contain", productName);
  }

  verifyCartItemsCount(expectedCount) {
    if (expectedCount === 0) {
      this.verifyCartIsEmpty();
    } else {
      this.elements.cartItems().should("have.length", expectedCount);
    }
  }

  verifyCartIsEmpty() {
    // Pode ser que mostre mensagem ou simplesmente não tenha itens
    cy.get("body").then(($body) => {
      if ($body.find("#empty_cart").length > 0) {
        this.elements.emptyCartMessage().should("be.visible");
      } else {
        this.elements.cartItems().should("not.exist");
      }
    });
  }

  verifyProductPrice(productName, expectedPrice) {
    // Remove símbolos de moeda e espaços para comparação
    const cleanPrice = expectedPrice.replace(/[Rs.\s]/g, "");

    this.elements.cartItems().each(($row) => {
      cy.wrap($row)
        .find(".cart_description h4 a")
        .invoke("text")
        .then((name) => {
          if (name.trim() === productName.trim()) {
            cy.wrap($row)
              .find(".cart_price p")
              .invoke("text")
              .then((price) => {
                const cleanCartPrice = price.replace(/[Rs.\s]/g, "");
                expect(cleanCartPrice).to.equal(cleanPrice);
              });
          }
        });
    });
  }

  verifyTotalAmount(expectedTotal) {
    this.getTotalPrice().then((total) => {
      const cleanTotal = total.replace(/[Rs.\s]/g, "");
      const cleanExpected = expectedTotal.replace(/[Rs.\s]/g, "");
      expect(cleanTotal).to.equal(cleanExpected);
    });
  }
}

export default new CartPage();
