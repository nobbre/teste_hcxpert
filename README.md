# 🎯 HCXpert - Desafio Técnico QA/SDET 2026

[![CI](https://github.com/nobbre/teste_hcxpert/actions/workflows/auto-pr.yaml/badge.svg?branch=desenvolvimento)](https://github.com/nobbre/teste_hcxpert/actions/workflows/auto-pr.yaml)
[![Cypress](https://img.shields.io/badge/Cypress-15.18.1-green.svg)](https://www.cypress.io/)
[![Cucumber](https://img.shields.io/badge/Cucumber-BDD-brightgreen.svg)](https://cucumber.io/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como resposta ao **Desafio Técnico de Engenharia de Qualidade (QA/SDET)** da HCXpert. Implementa automação de testes E2E e de API com Cypress, Cucumber (BDD) e Page Object Model, executada a cada push em uma esteira do GitHub Actions.

**Autor:** Antonio Nobre Machado — QA Automation / Quality Engineer · [LinkedIn](https://www.linkedin.com/in/nobbre)

**Em números:** 5 features · 24 cenários (positivos e negativos) · 4 Page Objects · testes de UI e de API

### 🎓 Objetivo

Avaliar a capacidade de:
- ✅ Planejar cenários de teste em formato BDD (Gherkin)
- ✅ Estruturar frameworks modernos de automação
- ✅ Garantir cobertura robusta de testes
- ✅ Documentar resultados de forma profissional
- ✅ Aplicar padrões de projeto (Page Object Model)

## 🛠️ Stack Tecnológica

### Tecnologias Obrigatórias

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| **Cypress** | 15.18.1 | Framework de automação E2E |
| **Cucumber** | 26.0.0 | BDD - Escrita de cenários em Gherkin |
| **JavaScript/Node.js** | 20.x | Linguagem de programação |
| **Page Object Model** | - | Padrão de projeto para isolamento |

### Dependências Principais

```json
{
  "@badeball/cypress-cucumber-preprocessor": "^26.0.0",
  "@bahmutov/cypress-esbuild-preprocessor": "^2.2.8",
  "cypress": "^15.18.1"
}
```

## 📂 Estrutura do Projeto

```
teste_hcxpert/
├── cypress/
│   ├── e2e/
│   │   ├── features/              # Arquivos .feature (BDD)
│   │   │   ├── login.feature
│   │   │   ├── search.feature
│   │   │   ├── add_to_cart.feature
│   │   │   ├── checkout.feature
│   │   │   └── api_trello.feature
│   │   └── step_definitions/      # Step definitions (Cucumber)
│   │       ├── loginSteps.js
│   │       ├── searchSteps.js
│   │       ├── cartSteps.js
│   │       ├── checkoutSteps.js
│   │       └── apiSteps.js
│   ├── evidencias/                # Screenshots organizados por feature
│   │   ├── login.feature/
│   │   ├── search.feature/
│   │   ├── add_to_cart.feature/
│   │   ├── checkout.feature/
│   │   └── api_trello.feature/
│   ├── support/
│   │   ├── page_objects/          # Page Object Model (POM)
│   │   │   ├── homePage.js
│   │   │   ├── loginPage.js
│   │   │   ├── productsPage.js
│   │   │   └── cartPage.js
│   │   ├── commands.js
│   │   └── e2e.js
│   └── fixtures/
│       └── users.json             # Massa de dados estruturada
├── scripts/
│   ├── templates/                 # Modelos HTML para relatórios
│   │   ├── api-evidence-01.html
│   │   └── api-evidence-02.html
│   ├── capture-chrome-window.ps1  # Captura de janela do browser
│   ├── capture-api-evidencias.mjs # Geração de evidências de API
│   ├── generate-report.mjs        # Gerador de relatório Cucumber
│   └── upload-xray.mjs            # Sincronização com JIRA Xray
├── cypress.config.js              # Configuração global do Cypress
├── package.json                   # Manifesto e dependências
├── .env.example                   # Modelo de variáveis de ambiente
├── .gitignore                     # Exclusões do controle de versão
└── README.md                      # Esta documentação
```

## 🚀 Configuração e Instalação

### Pré-requisitos

- **Node.js** 20.x (mesma versão usada na esteira de CI)
- **npm** (instalado junto com o Node.js)
- **Git** 2.x ou superior

### Instalação Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/nobbre/teste_hcxpert.git
cd teste_hcxpert
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env conforme necessário
```

4. **Verifique a instalação**
```bash
npm run open
```

## 🎮 Execução dos Testes

### Modo Interativo (Cypress UI)

```bash
npm run open
```

### Modo Headless (CI/CD)

```bash
# Executar todos os testes
npm test

# Executar com navegador visível
npm run test:headed

# Executar em navegadores específicos
npm run test:chrome
npm run test:firefox
npm run test:edge
```

### Execução por Feature

```bash
# Testes de Login
npm run test:login

# Testes de Busca
npm run test:search

# Testes de Carrinho
npm run test:cart

# Testes de Checkout
npm run test:checkout

# Testes de API
npm run test:api
```

### Execução por Tags

```bash
# Apenas testes marcados como @smoke
npm run test:smoke

# Testes positivos
npx cypress run --env tags=@positivo

# Testes negativos
npx cypress run --env tags=@negativo

# Testes de API
npx cypress run --env tags=@api
```

## 📊 Relatórios e Evidências

### Geração de Relatório Consolidado

```bash
npm run report
```

O relatório HTML será gerado em: `cypress/reports/cucumber-report.html`

### Captura de Evidências de API

```bash
npm run api:evidencias
```

Evidências serão salvas em: `cypress/evidencias/api_trello.feature/`

### Screenshots Automáticos

Screenshots são capturados automaticamente:
- ✅ Em caso de falha de teste
- ✅ Organizados por feature
- ✅ Com timestamp único

Localização: `cypress/evidencias/<nome-da-feature>/`

### Captura Manual de Janela do Browser (Windows)

```powershell
.\scripts\capture-chrome-window.ps1
```

## 🧪 Cenários de Teste Implementados

### 1. Login (login.feature)

| Cenário | Tipo | Status |
|---------|------|--------|
| Login com credenciais válidas | Positivo | ✅ |
| Login com senha incorreta | Negativo | ✅ |
| Login com email não cadastrado | Negativo | ✅ |
| Login com campos vazios | Negativo | ✅ |

### 2. Busca de Produtos (search.feature)

| Cenário | Tipo | Status |
|---------|------|--------|
| Busca de produto existente | Positivo | ✅ |
| Busca por múltiplos termos | Positivo | ✅ |
| Busca sem correspondência | Negativo | ✅ |
| Busca com campo vazio | Negativo | ✅ |

### 3. Carrinho de Compras (add_to_cart.feature)

| Cenário | Tipo | Status |
|---------|------|--------|
| Adicionar produto ao carrinho | Positivo | ✅ |
| Adicionar múltiplos produtos | Positivo | ✅ |
| Aumentar quantidade | Positivo | ✅ |
| Remover produto do carrinho | Negativo | ✅ |
| Persistência do carrinho | Positivo | ✅ |

### 4. Checkout (checkout.feature)

| Cenário | Tipo | Status |
|---------|------|--------|
| Checkout completo | Positivo | ✅ |
| Checkout sem campo obrigatório | Negativo | ✅ |
| Pagamento com cartão inválido | Negativo | ✅ |
| Checkout sem produtos | Negativo | ✅ |
| Validação de campos do cartão | Negativo | ✅ |

### 5. API - Trello e Automation Exercise (api_trello.feature)

| Cenário | Tipo | Endpoint | Status |
|---------|------|----------|--------|
| Consultar ação Trello (GET) | Positivo | /1/actions/{id} | ✅ |
| Validar estrutura da resposta | Positivo | /1/actions/{id} | ✅ |
| Ação inexistente (404) | Negativo | /1/actions/{id} | ✅ |
| Criar conta (POST) | Positivo | /api/createAccount | ✅ |
| Email já existente | Negativo | /api/createAccount | ✅ |
| Parâmetros obrigatórios ausentes | Negativo | /api/createAccount | ✅ |

## 🏗️ Padrões e Arquitetura

### Page Object Model (POM)

Todos os elementos e ações da UI estão encapsulados em classes Page Object:

```javascript
// Exemplo: homePage.js
class HomePage {
  elements = {
    logo: () => cy.get('img[alt="Website for automation practice"]'),
    loginLink: () => cy.contains('Signup / Login')
  }
  
  visit() {
    cy.visit(this.url);
  }
  
  navigateToLoginPage() {
    this.elements.loginLink().click();
  }
}
```

### Step Definitions

Implementação dos passos Gherkin conectando aos Page Objects:

```javascript
// loginSteps.js
Given('que estou na página inicial do site', () => {
  homePage.visit();
});

When('eu acesso a página de login', () => {
  homePage.navigateToLoginPage();
});
```

### Fixtures

Dados de teste centralizados e reutilizáveis:

```json
{
  "validUser": {
    "name": "Test User HCXpert",
    "email": "testuser@hcxpert.com",
    "password": "Test@123456"
  }
}
```

## 🔄 Integração Contínua

### Integração com JIRA Xray

```bash
# Fazer upload dos resultados para o Xray
npm run xray:upload
```

**Configuração necessária no `.env`:**
```env
XRAY_CLIENT_ID=seu_client_id
XRAY_CLIENT_SECRET=seu_client_secret
XRAY_PROJECT_KEY=HCXP
```

### Pipeline CI/CD (GitHub Actions)

O projeto tem duas esteiras em `.github/workflows/` (detalhes em [`.github/workflows/README.md`](.github/workflows/README.md)):

| Workflow | Quando roda | O que faz |
|----------|-------------|-----------|
| `auto-pr.yaml` | A cada push em qualquer branch, exceto `main` | Executa todos os cenários no Chrome (headless), publica evidências e relatório como artifacts e, se os testes passarem, abre automaticamente a Pull Request para `main` |
| `manual-tests.yaml` | Sob demanda (*Run workflow*) | Permite escolher navegador (Chrome, Firefox, Edge), filtrar por tag e executar uma feature específica |

Ou seja, nenhum código chega à `main` sem a suíte de testes aprovada.

## 📝 Boas Práticas Implementadas

✅ **BDD Puro**: Cenários escritos 100% em Gherkin (sem `describe` ou `it`)  
✅ **Isolamento**: Page Objects isolam elementos e ações  
✅ **Reutilização**: Fixtures e commands customizados  
✅ **Tratamento de Assincronismo**: Waits estratégicos do Cypress  
✅ **Seletores Resilientes**: Uso de data-attributes quando disponíveis  
✅ **Evidências**: Screenshots automáticos em falhas  
✅ **Organização**: Estrutura de pastas conforme especificação  
✅ **Documentação**: Código comentado e README completo  

## 🎯 Requisitos do Desafio

### ✅ PARTE 1 - Especificação e Cenários

- [x] Cenários em Gherkin (Cucumber)
- [x] Mínimo 1 cenário positivo por funcionalidade
- [x] Mínimo 1 cenário negativo por funcionalidade
- [x] Proibição de termos xUnit/Mocha (`describe`, `it`)
- [x] Cobertura: Login, Busca, Carrinho, Checkout, Validações
- [x] Parecer crítico sobre testabilidade (ver seção abaixo)

### ✅ PARTE 2 - Automação

**Web:**
- [x] Site alvo: https://www.automationexercise.com
- [x] Cypress como framework
- [x] Page Object Model
- [x] Fixtures para massa de testes

**API:**
- [x] GET para Trello (`/1/actions/592f11060f95a3d3d46a987a`)
- [x] Extração e log do campo `list.name`
- [x] Validação de Status Code
- [x] POST para Automation Exercise (`/api/createAccount`)
- [x] Validação de regras de negócio

### ✅ PARTE 3 - Critérios de Avaliação

- [x] Organização do código (POM, reutilização)
- [x] Execução aprovada na esteira de CI (ver badge no topo)
- [x] Tratamento de assincronismo
- [x] Evidências e scripts funcionais
- [x] Relatório de entregas (ver matriz abaixo)

## 📊 Matriz de Entregas

| Requisito | Status | Observações |
|-----------|--------|-------------|
| **Estrutura de Diretórios** | ✅ Completo | Segue o layout de pastas especificado no desafio |
| **Arquivos .feature** | ✅ Completo | 5 features, 24 cenários |
| **Step Definitions** | ✅ Completo | Todos os passos implementados |
| **Page Objects** | ✅ Completo | 4 Page Objects (Home, Login, Products, Cart) |
| **Fixtures** | ✅ Completo | users.json com dados estruturados |
| **Automação Web** | ✅ Completo | Todos os fluxos implementados |
| **Automação API** | ✅ Completo | GET Trello + POST Automation Exercise |
| **Scripts de Evidências** | ✅ Completo | PowerShell + Node.js scripts |
| **Templates HTML** | ✅ Completo | 2 templates profissionais |
| **Relatório Cucumber** | ✅ Completo | HTML consolidado |
| **Integração Xray** | ✅ Completo | Script de upload implementado |
| **Documentação** | ✅ Completo | README abrangente |

## 🔍 Parecer Crítico - Testabilidade

### Site: Automation Exercise

**Pontos Positivos:**
- ✅ Boa cobertura de data-attributes (`data-qa`)
- ✅ Estrutura HTML semântica
- ✅ API pública documentada
- ✅ Ambiente estável

**Desafios Identificados:**
- ⚠️ Alguns elementos dependem de hover (overlay)
- ⚠️ Validações de formulário inconsistentes
- ⚠️ Timeouts necessários em transições
- ⚠️ Mensagens de erro não padronizadas

**Recomendações:**
- 📌 Uso de `{force: true}` em elementos com overlay
- 📌 Validações flexíveis para mensagens de erro
- 📌 Waits estratégicos após ações críticas
- 📌 Fallbacks para seletores alternativos

## 🐛 Troubleshooting

### Problema: Testes falhando por timeout

**Solução:**
```javascript
// Aumentar timeout específico
cy.get('.elemento', { timeout: 15000 })

// Ou ajustar no cypress.config.js
defaultCommandTimeout: 15000
```

### Problema: Elementos não encontrados

**Solução:**
```javascript
// Verificar visibilidade antes de clicar
cy.get('.elemento').should('be.visible').click()

// Usar force em overlays
cy.get('.elemento').click({ force: true })
```

### Problema: API retornando erro 404

**Solução:**
- Verificar se o endpoint está correto
- Validar se a URL base está configurada
- Checar logs do Cypress para detalhes

## 📞 Suporte e Contato

**Autor:** Antonio Nobre Machado  
**Email:** nobbre@gmail.com  
**LinkedIn:** [linkedin.com/in/nobbre](https://www.linkedin.com/in/nobbre)  
**GitHub:** [github.com/nobbre/teste_hcxpert](https://github.com/nobbre/teste_hcxpert)

## 📄 Licença

Este projeto está sob a licença ISC.

---

## 🎉 Agradecimentos

Agradeço à **HCXpert** pela oportunidade de participar deste desafio técnico. Foi uma experiência enriquecedora que permitiu demonstrar conhecimentos em:

- ✨ Automação moderna com Cypress e Cucumber
- ✨ Padrões de projeto (Page Object Model)
- ✨ BDD e Gherkin
- ✨ Testes de API
- ✨ Documentação técnica profissional

---

<div align="center">
  <strong>Desenvolvido com 💜 para o HCXpert QA Challenge 2026</strong>
</div>
