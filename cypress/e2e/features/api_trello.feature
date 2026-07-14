# language: pt
@api
Funcionalidade: Validação de APIs
  Como um engenheiro de qualidade
  Eu quero validar os endpoints de diferentes APIs
  Para garantir a integridade dos dados e regras de negócio

  @positivo @api @trello
  Cenário: Consultar ação específica na API do Trello (GET)
    Dado que tenho acesso à API do Trello
    Quando eu envio uma requisição GET para o endpoint "/1/actions/592f11060f95a3d3d46a987a"
    Então o status code da resposta deve ser 200
    E o corpo da resposta deve conter o campo "data.list"
    E o campo "data.list.name" deve estar presente e não vazio
    E devo extrair e registrar o valor do campo "data.list.name"

  @positivo @api @trello
  Cenário: Validar estrutura completa da resposta da API Trello
    Dado que tenho acesso à API do Trello
    Quando eu envio uma requisição GET para o endpoint "/1/actions/592f11060f95a3d3d46a987a"
    Então o status code da resposta deve ser 200
    E a resposta deve conter os campos obrigatórios:
      | campo         |
      | id            |
      | type          |
      | date          |
      | data          |
      | memberCreator |
    E o corpo da resposta deve conter o campo "data.list"
    E o campo "data.list.name" deve estar presente e não vazio

  @negativo @api @trello
  Cenário: Requisição para ação inexistente retorna erro 404
    Dado que tenho acesso à API do Trello
    Quando eu envio uma requisição GET para o endpoint "/1/actions/idInexistente123xyz"
    Então o status code da resposta deve ser 404 ou 400

  @positivo @api @automation_exercise
  Cenário: Criar conta com dados válidos via API (POST)
    Dado que tenho acesso à API do Automation Exercise
    Quando eu envio uma requisição POST para "/api/createAccount" com os dados:
      | campo          | valor                    |
      | name           | Test User API            |
      | email          | testapi@hcxpert.com      |
      | password       | Test@123                 |
      | title          | Mr                       |
      | birth_date     | 15                       |
      | birth_month    | 5                        |
      | birth_year     | 1990                     |
      | firstname      | Test                     |
      | lastname       | User                     |
      | company        | HCXpert                  |
      | address1       | 123 Test Street          |
      | address2       | Apt 456                  |
      | country        | United States            |
      | zipcode        | 90001                    |
      | state          | California               |
      | city           | Los Angeles              |
      | mobile_number  | +1 555-0123              |
    Então o status code da resposta deve ser 200 ou 201
    E o corpo da resposta deve conter o campo "responseCode"
    E a resposta deve indicar sucesso na criação

  @negativo @api @automation_exercise
  Cenário: Tentativa de criar conta com email já existente
    Dado que tenho acesso à API do Automation Exercise
    Quando eu envio uma requisição POST para "/api/createAccount" com email já cadastrado

  @negativo @api @automation_exercise
  Cenário: Tentativa de criar conta sem parâmetros obrigatórios
    Dado que tenho acesso à API do Automation Exercise
    Quando eu envio uma requisição POST para "/api/createAccount" sem o campo "email"
    E o corpo da resposta deve indicar parâmetros faltantes
