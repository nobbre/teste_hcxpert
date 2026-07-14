/**
 * Step Definitions para API (Trello e Automation Exercise)
 * Implementação dos passos BDD para testes de API
 */
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let apiResponse;
let requestBody;
let listName;

// Helper: Parse JSON body se for string
const getResponseBody = () => {
  let body = apiResponse.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      // Se não for JSON válido, mantém como string
    }
  }
  return body;
};

// ============================================
// TRELLO API - Step Definitions
// ============================================

Given("que tenho acesso à API do Trello", () => {
  // Validação inicial - API disponível
  cy.log("Preparando requisição para API do Trello");
});

When("eu envio uma requisição GET para o endpoint {string}", (endpoint) => {
  const baseUrl = "https://api.trello.com";
  cy.request({
    method: "GET",
    url: `${baseUrl}${endpoint}`,
    failOnStatusCode: false,
  }).then((response) => {
    apiResponse = response;
    cy.log("Response recebido:", response);

    // Captura evidência de API
    cy.task("log", {
      endpoint: endpoint,
      method: "GET",
      status: response.status,
      body: response.body,
    });
  });
});

Then("o status code da resposta deve ser {int}", (expectedStatusCode) => {
  expect(apiResponse.status).to.equal(expectedStatusCode);
});

Then("o corpo da resposta deve conter o campo {string}", (fieldPath) => {
  const fields = fieldPath.split(".");
  let value = getResponseBody();

  fields.forEach((field) => {
    expect(value).to.have.property(field);
    value = value[field];
  });
});

Then("o campo {string} deve estar presente e não vazio", (fieldPath) => {
  const fields = fieldPath.split(".");
  let value = getResponseBody();

  fields.forEach((field) => {
    expect(value).to.have.property(field);
    value = value[field];
  });

  expect(value).to.not.be.empty;
});

Then("devo extrair e registrar o valor do campo {string}", (fieldPath) => {
  const fields = fieldPath.split(".");
  let value = getResponseBody();

  fields.forEach((field) => {
    value = value[field];
  });

  listName = value;
  cy.log(`Valor extraído de "${fieldPath}": ${listName}`);

  // Salvar evidência
  cy.writeFile(
    "cypress/evidencias/api_trello.feature/list_name.txt",
    `Campo: ${fieldPath}\nValor: ${listName}\nTimestamp: ${new Date().toISOString()}`,
  );
});

Then("a resposta deve conter os campos obrigatórios:", (dataTable) => {
  const requiredFields = dataTable.rawTable.slice(1).map((row) => row[0]);
  const body = getResponseBody();

  requiredFields.forEach((field) => {
    expect(body).to.have.property(field);
    cy.log(`✓ Campo "${field}" encontrado`);
  });
});

Then(
  "o status code da resposta deve ser {int} ou {int}",
  (statusCode1, statusCode2) => {
    expect([statusCode1, statusCode2]).to.include(apiResponse.status);
  },
);

// ============================================
// AUTOMATION EXERCISE API - Step Definitions
// ============================================

Given("que tenho acesso à API do Automation Exercise", () => {
  cy.log("Preparando requisição para API do Automation Exercise");
});

When(
  "eu envio uma requisição POST para {string} com os dados:",
  (endpoint, dataTable) => {
    const baseUrl = "https://www.automationexercise.com";

    // Converte DataTable em objeto
    requestBody = {};
    dataTable.rawTable.slice(1).forEach((row) => {
      requestBody[row[0]] = row[1];
    });

    // Adiciona timestamp ao email para garantir unicidade
    if (requestBody.email) {
      const timestamp = Date.now();
      requestBody.email = requestBody.email.replace("@", `+${timestamp}@`);
      cy.log(`Email único gerado: ${requestBody.email}`);
    }

    cy.request({
      method: "POST",
      url: `${baseUrl}${endpoint}`,
      form: true,
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      apiResponse = response;
      cy.log("Response recebido:", response);

      // Captura evidência de API
      cy.task("log", {
        endpoint: endpoint,
        method: "POST",
        status: response.status,
        requestBody: requestBody,
        responseBody: response.body,
      });
    });
  },
);

When(
  "eu envio uma requisição POST para {string} com email já cadastrado",
  (endpoint) => {
    const baseUrl = "https://www.automationexercise.com";

    requestBody = {
      name: "Existing User",
      email: "existinguser@test.com",
      password: "Test@123",
    };

    cy.request({
      method: "POST",
      url: `${baseUrl}${endpoint}`,
      form: true,
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      apiResponse = response;
    });
  },
);

When(
  "eu envio uma requisição POST para {string} sem o campo {string}",
  (endpoint, missingField) => {
    const baseUrl = "https://www.automationexercise.com";

    requestBody = {
      name: "Test User",
      // Propositalmente omitindo o campo especificado
    };

    cy.request({
      method: "POST",
      url: `${baseUrl}${endpoint}`,
      form: true,
      body: requestBody,
      failOnStatusCode: false,
    }).then((response) => {
      apiResponse = response;
    });
  },
);

Then("o corpo da resposta deve conter mensagem de erro", () => {
  const body = getResponseBody();
  expect(body).to.exist;
  // A API pode retornar o erro de várias formas
  const bodyStr = JSON.stringify(body).toLowerCase();
  const hasError =
    bodyStr.includes("error") ||
    bodyStr.includes("exist") ||
    bodyStr.includes("invalid") ||
    apiResponse.status >= 400;
  expect(hasError).to.be.true;
});

Then("a mensagem deve indicar que o email já existe", () => {
  const body = getResponseBody();
  const bodyStr = JSON.stringify(body).toLowerCase();
  const hasEmailExistsMessage =
    bodyStr.includes("exist") || bodyStr.includes("already");
  expect(hasEmailExistsMessage).to.be.true;
});

Then("o corpo da resposta deve indicar parâmetros faltantes", () => {
  const body = getResponseBody();
  const bodyStr = JSON.stringify(body).toLowerCase();
  const hasMissingParamsMessage =
    bodyStr.includes("required") ||
    bodyStr.includes("missing") ||
    bodyStr.includes("parameter");
  expect(hasMissingParamsMessage).to.be.true;
});

Then("a resposta deve indicar sucesso na criação", () => {
  // Verifica se a resposta indica sucesso
  const body = getResponseBody();
  if (typeof body === "object") {
    const bodyStr = JSON.stringify(body).toLowerCase();
    const isSuccess =
      bodyStr.includes("success") ||
      bodyStr.includes("created") ||
      apiResponse.status === 200 ||
      apiResponse.status === 201;
    expect(isSuccess).to.be.true;
  }
});
