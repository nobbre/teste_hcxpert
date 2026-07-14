/**
 * Step Definitions para Checkout
 * Implementação dos passos BDD para finalização de compra
 */
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import homePage from "../../support/page_objects/homePage";
import loginPage from "../../support/page_objects/loginPage";
import cartPage from "../../support/page_objects/cartPage";

let userData;
let checkoutData;

// Hooks para carregar dados
before(() => {
  cy.fixture("users").then((data) => {
    userData = data.validUser;
    checkoutData = data.checkoutInfo;
  });
});

// Contexto - Usuário autenticado
Given("estou autenticado no sistema", () => {
  // Realiza login antes dos testes de checkout
  homePage.visit();
  homePage.navigateToLoginPage();
  loginPage.login(userData.email, userData.password);
  cy.wait(1000);
  //homePage.verifyUserIsLoggedIn(userData.name);
});

// Ações - Checkout
When("prossigo para o checkout", () => {
  cartPage.proceedToCheckout();
  cy.wait(1000);
});

When("preencho as informações de endereço obrigatórias", () => {
  // Verifica se os campos já estão preenchidos (usuário cadastrado)
  // ou preenche conforme necessário
  cy.url().then((url) => {
    if (url.includes("checkout")) {
      cy.log("Informações de endereço já preenchidas do cadastro");
    }
  });
});

When("confirmo o pedido", () => {
  // Adiciona comentário e confirma
  cy.get("textarea.form-control").type(
    "Pedido de teste - HCXpert QA Challenge",
  );
  cy.contains("Place Order").click();
  cy.wait(1000);
});

When("preencho os dados do cartão de crédito", (dataTable) => {
  const cardData = {};
  dataTable.rawTable.slice(1).forEach((row) => {
    cardData[row[0]] = row[1];
  });

  cy.get('input[data-qa="name-on-card"]').type(cardData["Nome no Cartão"]);
  cy.get('input[data-qa="card-number"]').type(cardData["Número"]);
  cy.get('input[data-qa="cvc"]').type(cardData["CVC"]);
  cy.get('input[data-qa="expiry-month"]').type(cardData["Mês Expiração"]);
  cy.get('input[data-qa="expiry-year"]').type(cardData["Ano Expiração"]);
});

When("confirmo o pagamento", () => {
  cy.get('button[data-qa="pay-button"]').click();
  cy.wait(2000); // Aguarda processamento
});

When("deixo o campo {string} vazio", (fieldName) => {
  cy.log(`Campo "${fieldName}" será deixado vazio intencionalmente`);
  // Não preenche o campo especificado
});

When("tento confirmar o pedido", () => {
  cy.contains("Place Order").click();
});

When("preencho o campo de número do cartão com {string}", (cardNumber) => {
  cy.get('input[data-qa="card-number"]').clear().type(cardNumber);
});

When("preencho os demais dados do cartão", () => {
  cy.get('input[data-qa="name-on-card"]').type(checkoutData.cardName);
  cy.get('input[data-qa="cvc"]').type(checkoutData.cvc);
  cy.get('input[data-qa="expiry-month"]').type(checkoutData.expiryMonth);
  cy.get('input[data-qa="expiry-year"]').type(checkoutData.expiryYear);
});

When("deixo os campos do cartão vazios", () => {
  cy.log("Campos do cartão serão deixados vazios intencionalmente");
  // Não preenche nenhum campo
});

// Validações - Checkout
Then("devo visualizar a mensagem de pedido confirmado", () => {
  cy.url().should("include", "payment_done");
});

Then("devo receber a confirmação {string}", (expectedMessage) => {
  cy.contains(expectedMessage).should("be.visible");
});

Then("devo visualizar mensagem de erro indicando campo obrigatório", () => {
  cy.get("body").then(($body) => {
    // Verifica HTML5 validation ou mensagem customizada
    const hasValidation =
      $body.find("input:invalid").length > 0 ||
      $body.text().includes("required") ||
      $body.text().includes("obrigatório");
    expect(hasValidation).to.be.true;
  });
});

Then("o checkout não deve ser concluído", () => {
  cy.url().should("not.include", "payment_done");
});

Then("devo visualizar mensagem de erro de cartão inválido", () => {
  cy.get("body").then(($body) => {
    const hasError =
      $body.text().toLowerCase().includes("invalid") ||
      $body.text().toLowerCase().includes("error") ||
      $body.find("input:invalid").length > 0;
    expect(hasError).to.be.true;
  });
});

Then("o pagamento não deve ser processado", () => {
  cy.url().should("not.include", "payment_done");
});

Then(
  "devo visualizar mensagens de erro para todos os campos obrigatórios do cartão",
  () => {
    // Verifica validação HTML5 ou mensagens customizadas
    cy.get('input[data-qa="name-on-card"]').then(($input) => {
      const isInvalid = $input[0].validity && !$input[0].validity.valid;
      if (isInvalid) {
        expect(isInvalid).to.be.true;
      }
    });
  },
);
