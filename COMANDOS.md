# 🎮 Comandos Úteis - HCXpert QA Challenge

## 📦 Instalação e Setup

```bash
# Clonar repositório
git clone https://github.com/nobbre/teste_hcxpert.git
cd teste_hcxpert

# Instalar dependências
npm install

# Verificar instalação do Cypress
npx cypress verify

# Criar arquivo .env a partir do exemplo
cp .env.example .env
```

---

## 🧪 Execução de Testes

### Modo Interativo (UI)

```bash
# Abrir Cypress Test Runner
npm run open

# Ou diretamente
npx cypress open
```

### Modo Headless (CLI)

```bash
# Executar todos os testes
npm test

# Executar com navegador visível
npm run test:headed

# Executar em navegador específico
npm run test:chrome
npm run test:firefox
npm run test:edge
```

### Executar Features Específicas

```bash
# Login
npm run test:login

# Busca
npm run test:search

# Carrinho
npm run test:cart

# Checkout
npm run test:checkout

# API
npm run test:api

# Testes smoke
npm run test:smoke
```

### Executar por Tags

```bash
# Apenas testes @smoke
npx cypress run --env tags=@smoke

# Apenas testes @positivo
npx cypress run --env tags=@positivo

# Apenas testes @negativo
npx cypress run --env tags=@negativo

# Apenas testes @api
npx cypress run --env tags=@api

# Apenas testes @e2e
npx cypress run --env tags=@e2e

# Combinar tags (E)
npx cypress run --env tags="@smoke and @positivo"

# Combinar tags (OU)
npx cypress run --env tags="@smoke or @api"
```

### Executar Arquivo Específico

```bash
# Executar apenas login.feature
npx cypress run --spec "cypress/e2e/features/login.feature"

# Executar múltiplos arquivos
npx cypress run --spec "cypress/e2e/features/login.feature,cypress/e2e/features/search.feature"

# Todos os arquivos de uma pasta
npx cypress run --spec "cypress/e2e/features/*.feature"
```

---

## 📊 Relatórios e Evidências

```bash
# Gerar relatório HTML consolidado
npm run report

# Gerar evidências de API
npm run api:evidencias

# Upload para JIRA Xray
npm run xray:upload

# Executar testes + gerar relatório
npm run full:test

# Limpar evidências antigas
npm run clean
```

---

## 🔍 Debug e Análise

```bash
# Executar em modo debug
npx cypress open --browser chrome --config watchForFileChanges=true

# Ver logs detalhados
DEBUG=cypress:* npm test

# Executar com screenshots habilitados
npx cypress run --config screenshotOnRunFailure=true

# Executar com vídeos habilitados
npx cypress run --config video=true
```

---

## 🛠️ Configuração e Manutenção

```bash
# Atualizar Cypress
npm install cypress@latest --save-dev

# Atualizar todas as dependências
npm update

# Verificar versões instaladas
npm list --depth=0

# Limpar cache do Cypress
npx cypress cache clear

# Ver localização do cache
npx cypress cache path

# Reinstalar Cypress
npx cypress install
```

---

## 📝 Desenvolvimento

```bash
# Adicionar nova dependência
npm install <pacote> --save-dev

# Executar script customizado
npm run <nome-do-script>

# Validar package.json
npm run validate

# Listar todos os scripts disponíveis
npm run
```

---

## 🌐 Execução em Diferentes Navegadores

```bash
# Chrome (padrão)
npx cypress run --browser chrome

# Firefox
npx cypress run --browser firefox

# Edge
npx cypress run --browser edge

# Electron (headless padrão)
npx cypress run --browser electron

# Chrome Canary
npx cypress run --browser chrome:canary

# Especificar path customizado
npx cypress run --browser /path/to/browser
```

---

## 📐 Configurações de Viewport

```bash
# Viewport mobile (iPhone X)
npx cypress run --config viewportWidth=375,viewportHeight=812

# Viewport tablet (iPad)
npx cypress run --config viewportWidth=768,viewportHeight=1024

# Viewport desktop (Full HD)
npx cypress run --config viewportWidth=1920,viewportHeight=1080

# Viewport customizado
npx cypress run --config viewportWidth=1280,viewportHeight=720
```

---

## ⚙️ Variáveis de Ambiente

```bash
# Passar variável de ambiente
npx cypress run --env BASE_URL=https://staging.example.com

# Múltiplas variáveis
npx cypress run --env BASE_URL=https://example.com,API_KEY=123456

# Usar arquivo .env (requer plugin)
npx cypress run --env configFile=development
```

---

## 📸 Screenshots e Vídeos

```bash
# Habilitar vídeos
npx cypress run --config video=true

# Desabilitar screenshots em falhas
npx cypress run --config screenshotOnRunFailure=false

# Customizar pasta de screenshots
npx cypress run --config screenshotsFolder=custom/screenshots

# Customizar pasta de vídeos
npx cypress run --config videosFolder=custom/videos

# Comprimir vídeos
npx cypress run --config videoCompression=32
```

---

## 🔄 Retry e Timeout

```bash
# Configurar retries em caso de falha
npx cypress run --config retries=3

# Aumentar timeout padrão
npx cypress run --config defaultCommandTimeout=15000

# Timeout de carregamento de página
npx cypress run --config pageLoadTimeout=60000

# Timeout de requisições
npx cypress run --config requestTimeout=10000
```

---

## 📦 Scripts PowerShell (Windows)

```powershell
# Capturar janela do Chrome
.\scripts\capture-chrome-window.ps1

# Com parâmetros customizados
.\scripts\capture-chrome-window.ps1 -OutputPath "custom/path.png" -WindowTitle "Cypress"

# Verificar política de execução
Get-ExecutionPolicy

# Permitir execução de scripts (se necessário)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 🔧 Troubleshooting

```bash
# Verificar instalação
npx cypress verify

# Ver informações de debug
npx cypress info

# Testar conexão de rede
npx cypress run --config baseUrl=https://httpstat.us/200

# Limpar node_modules e reinstalar
rm -rf node_modules package-lock.json
npm install

# Reset completo (Windows)
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm cache clean --force
npm install
```

---

## 📊 Análise de Resultados

```bash
# Ver resultados no console (verbose)
npx cypress run --reporter spec

# Salvar resultados em JSON
npx cypress run --reporter json --reporter-options output=results.json

# Múltiplos reporters
npx cypress run --reporter cypress-multi-reporters --reporter-options configFile=reporter-config.json
```

---

## 🚀 GitHub Actions - CI/CD Automatizado

O projeto possui **2 workflows automatizados** configurados:

### Workflows Disponíveis

#### 1. Auto PR com Testes (`auto-pr.yaml`)

**Trigger:** Push em qualquer branch (exceto main)

```bash
# Criar nova branch e fazer push
git checkout -b feature/minha-feature
git add .
git commit -m "feat: nova funcionalidade"
git push origin feature/minha-feature

# O workflow irá:
# 1. Executar todos os testes Cypress
# 2. Gerar evidências e relatórios
# 3. Criar PR automaticamente se testes passarem ✅
```

#### 2. Execução Manual (`manual-tests.yaml`)

**Trigger:** Manual via GitHub UI

1. Acesse: `Actions` → `Manual Test Execution`
2. Clique em `Run workflow`
3. Configure:
   - **Browser:** chrome / firefox / edge
   - **Tags:** @smoke, @api, @e2e, etc.
   - **Spec:** arquivo específico ou todos

**Exemplos de uso:**

```yaml
# Executar apenas testes smoke no Chrome
Browser: chrome
Tags: @smoke
Spec: (vazio)

# Executar testes de API no Firefox
Browser: firefox
Tags: @api
Spec: cypress/e2e/features/api_trello.feature

# Executar teste E2E no Edge
Browser: edge
Tags: @e2e
Spec: (vazio)
```

### Baixar Artifacts do GitHub Actions

```bash
# Via GitHub CLI (gh)
gh run list
gh run download <run-id>

# Ou manualmente via UI:
# 1. Vá para Actions → Selecione o workflow
# 2. Scroll até "Artifacts"
# 3. Clique para baixar (Screenshots, Videos, Reports)
```

### Ver Status dos Workflows

```bash
# Listar últimas execuções
gh run list --workflow=auto-pr.yaml

# Ver detalhes de uma execução
gh run view <run-id>

# Ver logs
gh run view <run-id> --log

# Re-executar workflow falhado
gh run rerun <run-id>
```

---

## 🔗 Links Úteis

- **Documentação Cypress:** https://docs.cypress.io
- **Cucumber Preprocessor:** https://github.com/badeball/cypress-cucumber-preprocessor
- **GitHub Actions Docs:** https://docs.github.com/en/actions
- **Automation Exercise:** https://www.automationexercise.com

---

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique a documentação em `/docs`
2. Consulte `QUICK_START.md` para guia rápido
3. Verifique `MATRIZ_ENTREGAS.md` para requisitos do projeto
4. Revise `.github/workflows/README.md` para detalhes dos workflows

---

**Última atualização:** 2026-07-14  
**Projeto:** HCXpert QA/SDET Technical Challenge 2026

````

---

## 🚀 CI/CD

```bash
# Simular execução CI (headless + chrome)
npm run test

# Executar em modo CI com configurações específicas
npx cypress run --record --key <record-key> --parallel

# Executar com variáveis de CI
CI=true npx cypress run
````

---

## 📚 Comandos Git Úteis

```bash
# Status do repositório
git status

# Ver diferenças
git diff

# Adicionar alterações
git add .

# Commit com mensagem
git commit -m "feat: adicionar novos testes"

# Push para remoto
git push origin main

# Ver histórico
git log --oneline --graph --all

# Criar nova branch
git checkout -b feature/novos-testes

# Voltar branch principal
git checkout main
```

---

## 🎯 Fluxo Completo de Trabalho

```bash
# 1. Limpar ambiente
npm run clean

# 2. Executar todos os testes
npm test

# 3. Gerar relatórios
npm run report
npm run api:evidencias

# 4. Revisar evidências
# Abrir: cypress/reports/cucumber-report.html

# 5. Upload para Xray (se configurado)
npm run xray:upload

# 6. Commit resultados (se necessário)
git add .
git commit -m "test: atualizar resultados dos testes"
git push
```

---

## 💡 Atalhos de Produtividade

```bash
# Alias úteis (adicionar ao .bashrc ou .zshrc)
alias cy="npx cypress"
alias cyo="npm run open"
alias cyt="npm test"
alias cyr="npm run report"

# Após adicionar os alias:
cy open          # Abre Cypress
cyt              # Executa testes
cyr              # Gera relatório
```

---

## 🔍 Busca e Filtros

```bash
# Encontrar arquivos por nome
find cypress -name "*.feature"

# Buscar texto em arquivos (Windows)
Select-String -Path "cypress/**/*.js" -Pattern "cy.get"

# Contar cenários implementados
(Select-String -Path "cypress/e2e/features/*.feature" -Pattern "Cenário:").Count

# Listar todas as tags usadas
Select-String -Path "cypress/e2e/features/*.feature" -Pattern "@" | Select-Object -Unique
```

---

## 📦 Backup e Restore

```bash
# Backup de evidências
Compress-Archive -Path cypress/evidencias -DestinationPath backup-evidencias-$(Get-Date -Format "yyyyMMdd").zip

# Backup completo do projeto (exceto node_modules)
git archive -o backup-projeto.zip HEAD

# Restore de evidências
Expand-Archive -Path backup-evidencias.zip -DestinationPath cypress/
```

---

## 🎨 Customizações

```bash
# Executar com baseURL customizada
npx cypress run --config baseUrl=https://staging.example.com

# Executar em modo headed com devtools aberto
npx cypress open --browser chrome --config chromeWebSecurity=false

# Desabilitar verificações de segurança (apenas para dev)
npx cypress run --config chromeWebSecurity=false
```

---

## 📞 Ajuda e Documentação

```bash
# Ver ajuda do Cypress
npx cypress help

# Ver ajuda de comando específico
npx cypress run --help

# Abrir documentação oficial
npx cypress help open
# Navegar para: https://docs.cypress.io
```

---

<div align="center">
  <strong>💡 Dica: Salve este arquivo como referência rápida!</strong>
</div>
