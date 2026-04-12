import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Use VITE_RESEND_API_KEY or RESEND_API_KEY
const apiKey = process.env.VITE_RESEND_API_KEY || process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, whatsapp, service, message } = req.body;

  if (!name || !whatsapp || !service || !message) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  if (!resend) {
    console.error('RESEND_API_KEY não configurada.');
    return res.status(500).json({ error: 'Configuração do servidor incompleta (API Key ausente).' });
  }

  try {
    await resend.emails.send({
      from: 'Correia Engenharia <onboarding@resend.dev>',
      to: 'contato@correiaengenharia.com',
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

    return res.status(200).json({ success: true, message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return res.status(500).json({ error: 'Erro interno ao processar a solicitação.' });
  }
}
