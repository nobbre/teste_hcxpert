/**
 * LoginPage - Page Object Model
 * Representa a página de login/cadastro do Automation Exercise
 */
class LoginPage {
  constructor() {
    this.url = "https://www.automationexercise.com/login";
  }

  // Seletores - Seção de Login
  elements = {
    // Login Section
    loginEmailInput: () => cy.get('input[data-qa="login-email"]'),
    loginPasswordInput: () => cy.get('input[data-qa="login-password"]'),
    loginButton: () => cy.get('button[data-qa="login-button"]'),
    loginErrorMessage: () =>
      cy.get('form[action="/login"] p').filter(':contains("incorrect")'),

    // Signup Section
    signupNameInput: () => cy.get('input[data-qa="signup-name"]'),
    signupEmailInput: () => cy.get('input[data-qa="signup-email"]'),
    signupButton: () => cy.get('button[data-qa="signup-button"]'),
    signupErrorMessage: () => cy.get('form[action="/signup"] p'),

    // Page elements
    loginFormTitle: () => cy.get("div.login-form h2"),
    signupFormTitle: () => cy.get("div.signup-form h2"),
  };

  // Ações - Login
  visit() {
    cy.visit(this.url);
  }

  fillLoginEmail(email) {
    this.elements.loginEmailInput().clear().type(email);
  }

  fillLoginPassword(password) {
    this.elements.loginPasswordInput().clear().type(password);
  }

  clickLoginButton() {
    this.elements.loginButton().click();
  }

  login(email, password) {
    this.fillLoginEmail(email);
    this.fillLoginPassword(password);
    this.clickLoginButton();
  }

  // Ações - Signup
  fillSignupName(name) {
    this.elements.signupNameInput().clear().type(name);
  }

  fillSignupEmail(email) {
    this.elements.signupEmailInput().clear().type(email);
  }

  clickSignupButton() {
    this.elements.signupButton().click();
  }

  signup(name, email) {
    this.fillSignupName(name);
    this.fillSignupEmail(email);
    this.clickSignupButton();
  }

  // Validações
  verifyLoginErrorMessage(expectedMessage) {
    this.elements.loginErrorMessage().should("be.visible");
    this.elements.loginErrorMessage().should("contain", expectedMessage);
  }

  verifySignupErrorMessage(expectedMessage) {
    this.elements.signupErrorMessage().should("be.visible");
    this.elements.signupErrorMessage().should("contain", expectedMessage);
  }

  verifyOnLoginPage() {
    cy.url().should("include", "/login");
    this.elements.loginFormTitle().should("be.visible");
  }

  verifyRequiredFields() {
    this.elements.loginEmailInput().then(($input) => {
      expect($input[0].required).to.be.true;
    });
    this.elements.loginPasswordInput().then(($input) => {
      expect($input[0].required).to.be.true;
    });
  }
}

export default new LoginPage();
