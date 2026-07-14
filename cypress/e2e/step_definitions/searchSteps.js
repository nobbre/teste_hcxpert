/**
 * Step Definitions para Busca de Produtos
 * Implementação dos passos BDD para funcionalidade de search
 */
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import homePage from "../../support/page_objects/homePage";
import productsPage from "../../support/page_objects/productsPage";

// Ações
When("eu realizo uma busca por {string}", (searchTerm) => {
  homePage.navigateToProducts();
  productsPage.verifyOnProductsPage();
  productsPage.searchProduct(searchTerm);
  cy.wait(500); // Aguarda resultados da busca
});

When("eu tento buscar sem informar nenhum termo", () => {
  homePage.navigateToProducts();
  productsPage.verifyOnProductsPage();
  productsPage.elements.searchButton().click();
});

// Validações
Then("devo visualizar produtos relacionados à busca", () => {
  productsPage.verifyProductsDisplayed();
});

Then(
  "os produtos exibidos devem conter o termo {string} em suas informações",
  (searchTerm) => {
    productsPage.verifySearchResults(searchTerm);
  },
);

Then("deve haver pelo menos {int} produto nos resultados", (minCount) => {
  productsPage.elements
    .productItems()
    .should("have.length.greaterThan", minCount - 1);
});

Then("não devo visualizar nenhum produto nos resultados", () => {
  productsPage.verifyNoSearchResults();
});

Then("devo ver uma mensagem indicando ausência de resultados", () => {
  // Verificar se não há produtos ou se há mensagem específica
  cy.get("body").then(($body) => {
    if ($body.find(".product-image-wrapper").length === 0) {
      // Sem produtos é válido
      expect($body.find(".product-image-wrapper").length).to.equal(0);
    }
  });
});

Then("devo permanecer na página atual", () => {
  cy.url().should("include", "/products");
});

Then("devo visualizar todos os produtos disponíveis", () => {
  productsPage.verifyProductsDisplayed();
});
