/**
 * Script para Captura de Evidências de API
 * Gera relatórios HTML formatados das requisições de API
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class APIEvidenceGenerator {
  constructor() {
    this.evidencesDir = path.join(
      __dirname,
      "..",
      "cypress",
      "evidencias",
      "api_trello.feature",
    );
    this.templatesDir = path.join(__dirname, "templates");
  }

  ensureDirectory(dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  generateHTMLReport(apiData) {
    const template = fs.readFileSync(
      path.join(this.templatesDir, "api-evidence-01.html"),
      "utf-8",
    );

    // Substitui placeholders no template
    let html = template
      .replace("{{TIMESTAMP}}", new Date().toISOString())
      .replace("{{ENDPOINT}}", apiData.endpoint)
      .replace("{{METHOD}}", apiData.method)
      .replace("{{STATUS_CODE}}", apiData.statusCode)
      .replace("{{REQUEST_BODY}}", JSON.stringify(apiData.requestBody, null, 2))
      .replace(
        "{{RESPONSE_BODY}}",
        JSON.stringify(apiData.responseBody, null, 2),
      )
      .replace("{{DURATION}}", apiData.duration || "N/A");

    return html;
  }

  saveEvidence(filename, content) {
    this.ensureDirectory(this.evidencesDir);
    const filepath = path.join(this.evidencesDir, filename);
    fs.writeFileSync(filepath, content, "utf-8");
    console.log(`✓ Evidência salva: ${filepath}`);
  }

  generateTrelloReport() {
    const mockData = {
      endpoint: "/1/actions/592f11060f95a3d3d46a987a",
      method: "GET",
      statusCode: 200,
      requestBody: null,
      responseBody: {
        id: "592f11060f95a3d3d46a987a",
        type: "updateList",
        list: {
          id: "5596683bf5cb15dd63a28916",
          name: "Professional",
        },
      },
      duration: "234ms",
    };

    const html = this.generateHTMLReport(mockData);
    this.saveEvidence("trello-api-evidence.html", html);
  }

  generateAutomationExerciseReport() {
    const mockData = {
      endpoint: "/api/createAccount",
      method: "POST",
      statusCode: 201,
      requestBody: {
        name: "Test User",
        email: "test@hcxpert.com",
        password: "Test@123",
      },
      responseBody: {
        responseCode: 201,
        message: "User created!",
      },
      duration: "567ms",
    };

    const html = this.generateHTMLReport(mockData);
    this.saveEvidence("automation-exercise-api-evidence.html", html);
  }

  run() {
    console.log("🚀 Gerando evidências de API...\n");

    try {
      this.generateTrelloReport();
      this.generateAutomationExerciseReport();

      console.log("\n✅ Todas as evidências foram geradas com sucesso!");
      console.log(`📁 Diretório: ${this.evidencesDir}`);
    } catch (error) {
      console.error("❌ Erro ao gerar evidências:", error);
      process.exit(1);
    }
  }
}

// Executa o gerador
const generator = new APIEvidenceGenerator();
generator.run();
