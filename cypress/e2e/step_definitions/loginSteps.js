/**
 * Step Definitions para Login
 * Implementação dos passos BDD para autenticação
 */
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import homePage from "../../support/page_objects/homePage";
import loginPage from "../../support/page_objects/loginPage";

let userData;

// Hooks para carregar dados de fixture
before(() => {
  cy.fixture("users").then((data) => {
    userData = data;
  });
});

// Contexto
Given("que estou na página inicial do site", () => {
  homePage.visit();
  homePage.verifyOnHomePage();
});

// Ações
When("eu acesso a página de login", () => {
  homePage.navigateToLoginPage();
  loginPage.verifyOnLoginPage();
});

When("preencho o campo de email com um usuário válido", () => {
  loginPage.fillLoginEmail(userData.validUser.email);
});

When("preencho o campo de senha com uma senha válida", () => {
  loginPage.fillLoginPassword(userData.validUser.password);
});

When("preencho o campo de senha com {string}", (password) => {
  loginPage.fillLoginPassword(password);
});

When("preencho o campo de email com {string}", (email) => {
  loginPage.fillLoginEmail(email);
});

When("clico no botão de login", () => {
  loginPage.clickLoginButton();
  cy.wait(1000); // Aguarda processamento
});

When("clico no botão de login sem preencher os campos", () => {
  loginPage.clickLoginButton();
});

// Validações
Then("devo ser autenticado com sucesso", () => {
  cy.url().should("not.include", "/login");
  // Verifica se não há mensagem de erro
  cy.get("body").should("not.contain", "incorrect");
});

Then("devo visualizar o nome do usuário no cabeçalho", () => {
  homePage.verifyUserIsLoggedIn(userData.validUser.name);
});

Then("devo visualizar a mensagem de erro {string}", (expectedMessage) => {
  loginPage.verifyLoginErrorMessage(expectedMessage);
});

Then("os campos de email e senha devem ser obrigatórios", () => {
  loginPage.verifyRequiredFields();
});
