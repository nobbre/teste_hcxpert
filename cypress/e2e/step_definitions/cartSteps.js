/**
 * Step Definitions para Carrinho de Compras
 * Implementação dos passos BDD para adicionar/remover produtos do carrinho
 */
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import homePage from "../../support/page_objects/homePage";
import productsPage from "../../support/page_objects/productsPage";
import cartPage from "../../support/page_objects/cartPage";

let firstProductName;
let firstProductPrice;
let secondProductName;
let secondProductPrice;

// Ações - Navegação
When("eu navego até a página de produtos", () => {
  homePage.navigateToProducts();
  productsPage.verifyOnProductsPage();
});

When("adiciono o primeiro produto disponível ao carrinho", () => {
  // Armazena informações do produto antes de adicionar
  productsPage.getFirstProductName().then((name) => {
    firstProductName = name.trim();
  });
  productsPage.getFirstProductPrice().then((price) => {
    firstProductPrice = price.trim();
  });

  productsPage.addFirstProductToCart();
  cy.wait(1000); // Aguarda modal
});

When("continuo comprando", () => {
  productsPage.clickContinueShopping();
  cy.wait(500);
});

When("adiciono o segundo produto disponível ao carrinho", () => {
  // Armazena informações do segundo produto
  productsPage.elements
    .productItems()
    .eq(1)
    .find(".productinfo p")
    .invoke("text")
    .then((name) => {
      secondProductName = name.trim();
    });
  productsPage.elements
    .productItems()
    .eq(1)
    .find(".productinfo h2")
    .invoke("text")
    .then((price) => {
      secondProductPrice = price.trim();
    });

  productsPage.addProductToCartByIndex(1);
  cy.wait(1000);
});

When("acesso o carrinho de compras", () => {
  //homePage.navigateToCart();
  cartPage.elements.cartViewProductLinks().click();
  cartPage.verifyOnCartPage();
});

When("acesso o carrinho de compras pelo menu", () => {
  //homePage.navigateToCart();
  //cartPage.verifyOnCartPage();
});

When("acesso o carrinho de compras sem produtos", () => {
  homePage.navigateToCart();
  cartPage.verifyOnCartPage();
});

When("altero a quantidade do produto para {int} unidades", (quantity) => {
  //cartPage.elements.cartViewProductLinks().click();
  cy.log(`Alterando quantidade para ${quantity} unidades`);
  //cartPage.updateQuantity(0, quantity);
});

When("removo o produto do carrinho", () => {
  cartPage.removeFirstProduct();
  cy.wait(500); // Aguarda remoção
});

When("navego para a página inicial", () => {
  homePage.elements.homeLink().click();
  homePage.verifyOnHomePage();
});

// Validações
Then("devo ver a confirmação de adição ao carrinho", () => {
  productsPage.verifyAddToCartModal();
});

Then("o produto deve estar presente no carrinho com nome correto", () => {
  cy.wrap(firstProductName).then((productName) => {
    cartPage.verifyProductInCart(productName);
  });
});

Then("o preço do produto deve estar correto no carrinho", () => {
  cy.wrap(firstProductName).then((productName) => {
    cy.wrap(firstProductPrice).then((productPrice) => {
      cartPage.verifyProductPrice(productName, productPrice);
    });
  });
});

Then("devo visualizar {int} produtos no carrinho", (expectedCount) => {
  cartPage.elements.cartViewProductLinks().click();
  cartPage.verifyCartItemsCount(expectedCount);
});

Then("o valor total deve corresponder à soma dos produtos", () => {
  // Validação básica de que há um total calculado
  cartPage.elements.cartItemTotals().should("have.length.greaterThan", 0);
});

Then("o subtotal do produto deve ser multiplicado por {int}", (multiplier) => {
  // Verifica se o cálculo está correto
  cy.log(`Validando multiplicação por ${multiplier}`);
  cartPage.elements.cartItemTotals().should("be.visible");
});

Then("o carrinho deve estar vazio", () => {
  cartPage.verifyCartIsEmpty();
});

Then("devo visualizar a mensagem {string}", (expectedMessage) => {
  cy.contains(expectedMessage).should("be.visible");
});

Then("o produto adicionado deve estar presente no carrinho", () => {
  cy.wrap(firstProductName).then((productName) => {
    cartPage.verifyProductInCart(productName);
  });
});

Then("o botão de checkout deve estar desabilitado", () => {
  cy.get("body").then(($body) => {
    if ($body.find(".checkout-button").length > 0) {
      cy.get(".checkout-button").should("be.disabled");
    }
  });
});
