/**
 * ProductsPage - Page Object Model
 * Representa a página de produtos do Automation Exercise
 */
class ProductsPage {
  constructor() {
    this.url = "https://www.automationexercise.com/products";
  }

  // Seletores
  elements = {
    pageTitle: () => cy.get("h2.title").filter(':contains("All Products")'),
    searchInput: () => cy.get("#search_product"),
    searchButton: () => cy.get("#submit_search"),
    productsList: () => cy.get(".features_items"),
    productItems: () => cy.get(".product-image-wrapper"),
    productNames: () => cy.get(".productinfo p"),
    productPrices: () => cy.get(".productinfo h2"),
    addToCartButtons: () =>
      cy.get(".productinfo a.btn").filter(':contains("Add to cart")'),
    viewProductButtons: () => cy.get('a:contains("View Product")'),
    // Modal de adição ao carrinho
    cartModal: () => cy.get("#cartModal"),
    continueShoppingButton: () => cy.get("#cartModal button.close-modal"),
    viewCartButton: () => cy.get("#cartModal p a[href='/view_cart']"),
    modalAddedToCart: () => cy.get("#cartModal .modal-content"),
    noResultsMessage: () =>
      cy.get(".product-image-wrapper").should("not.exist"),
  };

  // Ações
  visit() {
    cy.visit(this.url);
    cy.wait(1000); // Aguarda carregamento dos produtos
  }

  searchProduct(productName) {
    this.elements.searchInput().clear().type(productName);
    this.elements.searchButton().click();
    cy.wait(500); // Aguarda resultados da busca
  }

  addFirstProductToCart() {
    this.elements
      .productItems()
      .first()
      .within(() => {
        cy.get(".overlay-content a.btn")
          .filter(':contains("Add to cart")')
          .click({ force: true });
      });
  }

  addProductToCartByIndex(index) {
    this.elements
      .productItems()
      .eq(index)
      .within(() => {
        cy.get(".overlay-content a.btn")
          .filter(':contains("Add to cart")')
          .click({ force: true });
      });
  }

  clickContinueShopping() {
    this.elements.continueShoppingButton().click();
  }

  clickViewCart() {
    this.elements.viewCartButton().click();
  }

  getFirstProductName() {
    return this.elements
      .productItems()
      .first()
      .find(".productinfo p")
      .invoke("text");
  }

  getFirstProductPrice() {
    return this.elements
      .productItems()
      .first()
      .find(".productinfo h2")
      .invoke("text");
  }

  // Validações
  verifyOnProductsPage() {
    cy.url().should("include", "/products");
    this.elements.pageTitle().should("be.visible");
  }

  verifyProductsDisplayed() {
    this.elements.productItems().should("have.length.greaterThan", 0);
  }

  verifySearchResults(searchTerm) {
    this.elements.productItems().should("have.length.greaterThan", 0);
    // Verifica se algum produto contém o termo de busca (case insensitive)
    this.elements.productNames().then(($elements) => {
      const texts = [...$elements].map((el) => el.innerText.toLowerCase());
      const hasMatch = texts.some((text) =>
        text.includes(searchTerm.toLowerCase()),
      );
      expect(hasMatch).to.be.true;
    });
  }

  verifyNoSearchResults() {
    this.elements.productItems().should("not.exist");
  }

  verifyAddToCartModal() {
    this.elements.cartModal().should("be.visible");
    this.elements.modalAddedToCart().should("contain", "Added");
  }

  verifyModalMessage(message) {
    this.elements.cartModal().should("contain", message);
  }
}

export default new ProductsPage();
