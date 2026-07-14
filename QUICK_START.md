# 🚀 Guia Rápido de Início - HCXpert QA Challenge

## ⚡ Quick Start (5 minutos)

### 1. Instalação

```bash
# Clone o repositório
git clone https://github.com/nobbre/teste_hcxpert.git
cd teste_hcxpert

# Instale as dependências
npm install
```

### 2. Primeiro Teste

```bash
# Abrir Cypress em modo interativo
npm run open
```

**No Cypress Test Runner:**
1. Selecione "E2E Testing"
2. Escolha um navegador (Chrome recomendado)
3. Clique em qualquer arquivo `.feature` para executar

### 3. Executar Todos os Testes

```bash
# Modo headless (sem interface)
npm test

# Ver os testes rodando
npm run test:headed
```

### 4. Gerar Relatório

```bash
npm run report
```

Abra o arquivo: `cypress/reports/cucumber-report.html`

---

## 🎯 Comandos Mais Usados

| Comando | Descrição |
|---------|-----------|
| `npm run open` | Abre Cypress UI |
| `npm test` | Executa todos os testes |
| `npm run test:smoke` | Executa testes marcados @smoke |
| `npm run test:api` | Executa apenas testes de API |
| `npm run report` | Gera relatório HTML |
| `npm run clean` | Limpa evidências antigas |

---

## 📝 Estrutura de um Teste

### 1. Cenário (Gherkin) - `.feature`

```gherkin
# language: pt
Funcionalidade: Login
  
  @smoke @positivo
  Cenário: Login com sucesso
    Dado que estou na página inicial
    Quando eu realizo login com credenciais válidas
    Então devo ver minha conta autenticada
```

### 2. Step Definition - `.js`

```javascript
Given('que estou na página inicial', () => {
  homePage.visit();
});

When('eu realizo login com credenciais válidas', () => {
  loginPage.login(userData.email, userData.password);
});

Then('devo ver minha conta autenticada', () => {
  homePage.verifyUserIsLoggedIn(userData.name);
});
```

### 3. Page Object - `.js`

```javascript
class LoginPage {
  elements = {
    emailInput: () => cy.get('[data-qa="login-email"]'),
    passwordInput: () => cy.get('[data-qa="login-password"]'),
    loginButton: () => cy.get('[data-qa="login-button"]')
  }
  
  login(email, password) {
    this.elements.emailInput().type(email);
    this.elements.passwordInput().type(password);
    this.elements.loginButton().click();
  }
}
```

---

## 🔧 Configurações Importantes

### cypress.config.js

```javascript
{
  baseUrl: 'https://www.automationexercise.com',
  defaultCommandTimeout: 10000,
  screenshotOnRunFailure: true,
  retries: { runMode: 2, openMode: 0 }
}
```

### .env (Configuração Local)

```env
BASE_URL=https://www.automationexercise.com
TEST_USER_EMAIL=test@hcxpert.com
TEST_USER_PASSWORD=Test@123
```

---

## 🐛 Problemas Comuns

### ❌ "cypress: command not found"

**Solução:**
```bash
npx cypress open
# ou
npm install -g cypress
```

### ❌ Testes falhando por timeout

**Solução:** Aumente o timeout no `cypress.config.js`:
```javascript
defaultCommandTimeout: 15000
```

### ❌ Elementos não encontrados

**Solução:** Adicione wait ou force:
```javascript
cy.get('.elemento').should('be.visible').click()
// ou
cy.get('.elemento').click({ force: true })
```

---

## 📦 Adicionando Novo Teste

### Passo 1: Criar Feature

```bash
# Arquivo: cypress/e2e/features/minha_feature.feature
```

```gherkin
# language: pt
Funcionalidade: Minha Feature

  Cenário: Meu cenário de teste
    Dado que estou preparado
    Quando eu executo uma ação
    Então devo ver o resultado esperado
```

### Passo 2: Criar Step Definition

```bash
# Arquivo: cypress/e2e/step_definitions/minhaFeatureSteps.js
```

```javascript
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('que estou preparado', () => {
  // sua implementação
});

When('eu executo uma ação', () => {
  // sua implementação
});

Then('devo ver o resultado esperado', () => {
  // sua implementação
});
```

### Passo 3: Criar Page Object (se necessário)

```bash
# Arquivo: cypress/support/page_objects/minhaPage.js
```

```javascript
class MinhaPage {
  elements = {
    botao: () => cy.get('#meuBotao')
  }
  
  clicarBotao() {
    this.elements.botao().click();
  }
}

export default new MinhaPage();
```

### Passo 4: Criar Diretório de Evidências

```bash
mkdir cypress/evidencias/minha_feature.feature
```

---

## 🎨 Tags Disponíveis

| Tag | Uso | Exemplo |
|-----|-----|---------|
| `@smoke` | Testes críticos | `npx cypress run --env grepTags=@smoke` |
| `@positivo` | Fluxos felizes | `npx cypress run --env grepTags=@positivo` |
| `@negativo` | Casos de erro | `npx cypress run --env grepTags=@negativo` |
| `@api` | Testes de API | `npx cypress run --env grepTags=@api` |
| `@e2e` | Testes end-to-end | `npx cypress run --env grepTags=@e2e` |

---

## 📊 Visualizar Resultados

### 1. Console

Os logs aparecem no terminal durante execução:
```bash
npm test
```

### 2. Cypress UI

Visualização interativa com screenshots:
```bash
npm run open
```

### 3. Relatório HTML

Relatório consolidado com estatísticas:
```bash
npm run report
# Abrir: cypress/reports/cucumber-report.html
```

### 4. Screenshots

Automáticos em caso de falha:
```
cypress/evidencias/<nome-feature>/<screenshot>.png
```

---

## 🔗 Links Úteis

- **Cypress Docs:** https://docs.cypress.io
- **Cucumber Docs:** https://cucumber.io/docs/guides/
- **Site de Testes:** https://www.automationexercise.com
- **Trello API:** https://developer.atlassian.com/cloud/trello/

---

## 💡 Dicas Profissionais

### ✅ Sempre use Page Objects
```javascript
// ❌ Ruim
cy.get('#email').type('test@test.com');

// ✅ Bom
loginPage.fillEmail('test@test.com');
```

### ✅ Use Fixtures para Dados
```javascript
// ❌ Ruim
const email = 'test@test.com';

// ✅ Bom
cy.fixture('users').then(data => {
  const email = data.validUser.email;
});
```

### ✅ Adicione Waits Estratégicos
```javascript
// Após ações que demoram
cy.click().wait(1000);

// Ou espere por elemento
cy.get('.loading').should('not.exist');
```

### ✅ Use Seletores Estáveis
```javascript
// ❌ Frágil
cy.get('.btn-primary');

// ✅ Estável
cy.get('[data-qa="login-button"]');
```

---

## 🎓 Próximos Passos

1. ✅ Explore os testes existentes
2. ✅ Execute cada feature individualmente
3. ✅ Entenda o padrão Page Object
4. ✅ Adicione seus próprios cenários
5. ✅ Gere relatórios e evidências
6. ✅ Configure CI/CD

---

## 🆘 Suporte

- **Issues:** https://github.com/nobbre/teste_hcxpert/issues
- **Documentação Completa:** Veja README.md principal
- **Cypress Community:** https://discord.com/invite/cypress

---

<div align="center">
  <strong>Bons testes! 🎯</strong>
</div>
