/**
 * HomePage - Page Object Model
 * Representa a página inicial do Automation Exercise
 */
class HomePage {
  constructor() {
    this.url = "https://www.automationexercise.com";
  }

  // Seletores
  elements = {
    logo: () => cy.get('img[alt="Website for automation practice"]'),
    loginSignupLink: () => cy.contains("Signup / Login"),
    productsLink: () => cy.contains("Products"),
    cartLink: () => cy.get('a[href="/view_cart"]').first().click(), //cy.contains("Cart"),
    logoutLink: () => cy.contains("Logout"),
    loggedInUser: () => cy.get('a:contains("Logged in as Test User HCXpert")'),
    homeLink: () => cy.contains("Home"),
    contactUsLink: () => cy.contains("Contact us"),
    deleteAccountLink: () => cy.contains("Delete Account"),
  };

  // Ações
  visit() {
    cy.visit(this.url);
    cy.wait(1000); // Aguarda carregamento inicial
  }

  navigateToLoginPage() {
    this.elements.loginSignupLink().click();
  }

  navigateToProducts() {
    this.elements.productsLink().click();
  }

  navigateToCart() {
    this.elements.cartLink().click();
  }

  logout() {
    this.elements.logoutLink().click();
  }

  // Validações
  verifyUserIsLoggedIn(username) {
    //this.elements.loggedInUser().should("be.visible");
    this.elements.loggedInUser().should("contain", username);
  }

  verifyOnHomePage() {
    cy.url().should("include", this.url);
    this.elements.logo().should("be.visible");
  }
}

export default new HomePage();
