import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const { name, whatsapp, service, message } = req.body;

    if (!name || !whatsapp || !service || !message) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
      if (resend) {
        await resend.emails.send({
          from: "Correia Engenharia <onboarding@resend.dev>", // In production, this should be a verified domain
          to: "contato@correiaengenharia.com",
          subject: `Nova Solicitação de Orçamento - ${service}`,
          html: `
            <h1>Nova Solicitação de Orçamento</h1>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>WhatsApp:</strong> ${whatsapp}</p>
            <p><strong>Serviço:</strong> ${service}</p>
            <p><strong>Mensagem:</strong></p>
            <p>${message}</p>
          `,
        });
        res.json({ success: true, message: "E-mail enviado com sucesso!" });
      } else {
        console.log("RESEND_API_KEY não configurada. Dados recebidos:", { name, whatsapp, service, message });
        res.json({ 
          success: true, 
          message: "Modo de demonstração: API Key não configurada, mas os dados foram recebidos no servidor." 
        });
      }
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      res.status(500).json({ error: "Erro interno ao processar a solicitação." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
