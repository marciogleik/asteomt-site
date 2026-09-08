/**
 * Script para manter o site ASTEOMT ativo
 * Este script faz requisições periódicas para evitar que o Render suspenda o serviço
 * 
 * Como usar:
 * 1. Instale as dependências: npm install node-fetch@3
 * 2. Execute: node keep-alive.js
 * 
 * Para rodar em segundo plano:
 * nohup node keep-alive.js > keep-alive.log 2>&1 &
 */

import fetch from 'node-fetch';

// Configurações
const SITE_URL = 'https://asteomt.com.br';
const API_URL = 'https://asteomt-site.onrender.com/health';
const DB_KEEPALIVE_URL = 'https://asteomt-site.onrender.com/health/keep-alive-db';
const CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutos
const DB_CHECK_INTERVAL = 24 * 60 * 60 * 1000; // 1 dia (24 horas)
const TIMEOUT = 30000; // 30 segundos
let lastDbCheck = 0;

// Cores para o console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m'
};

// Função para formatar a data
function getFormattedDate() {
  return new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

// Função principal para verificar o site e a API
async function checkWebsite() {
  const startTime = Date.now();
  const timestamp = getFormattedDate();

  try {
    const controller1 = new AbortController();
    const timeoutId1 = setTimeout(() => controller1.abort(), TIMEOUT);

    // Ping Backend (Render API)
    const apiResponse = await fetch(API_URL, {
      signal: controller1.signal,
      headers: {
        'User-Agent': 'ASTEOMT-KeepAlive/1.0 (+https://asteomt-api.onrender.com)'
      }
    });
    
    clearTimeout(timeoutId1);

    const controller2 = new AbortController();
    const timeoutId2 = setTimeout(() => controller2.abort(), TIMEOUT);

    // Ping Frontend (Site)
    const siteResponse = await fetch(SITE_URL, {
      signal: controller2.signal,
      headers: {
        'User-Agent': 'ASTEOMT-KeepAlive/1.0 (+https://asteomt.com.br)'
      }
    });

    clearTimeout(timeoutId2);
    const responseTime = Date.now() - startTime;

    // Ping Banco de Dados (Envia 1 dado e retira 1 dado a cada 1 dia)
    let dbStatus = '';
    const now = Date.now();
    if (now - lastDbCheck >= DB_CHECK_INTERVAL || lastDbCheck === 0) {
      try {
        const dbController = new AbortController();
        const dbTimeout = setTimeout(() => dbController.abort(), TIMEOUT);
        const dbRes = await fetch(DB_KEEPALIVE_URL, {
          signal: dbController.signal,
          headers: { 'User-Agent': 'ASTEOMT-KeepAlive-DB/1.0' }
        });
        clearTimeout(dbTimeout);
        if (dbRes.ok) {
          lastDbCheck = now;
          dbStatus = ` | ${colors.blue}💾 Banco: Ping 24h OK (Dado enviado e retirado)${colors.reset}`;
        }
      } catch (dbErr) {
        dbStatus = ` | ${colors.yellow}💾 Banco: ${dbErr.message}${colors.reset}`;
      }
    }

    console.log(`[${timestamp}] ${colors.green}✅ Online${colors.reset} | API: ${apiResponse.status} | Site: ${siteResponse.status}${dbStatus} | Tempo: ${responseTime}ms`);

  } catch (error) {
    const errorType = error.name === 'AbortError' ? 'Timeout' : 'Erro';
    console.error(`[${timestamp}] ${colors.red}❌ ${errorType}${colors.reset} | ${error.message}`);
  }
}

// Mensagem inicial
console.log(`${colors.bright}${colors.blue}=== Monitoramento ASTEOMT ===${colors.reset}`);
console.log(`Site: ${SITE_URL}`);
console.log(`API (Backend Render): ${API_URL}`);
console.log(`Verificação a cada ${CHECK_INTERVAL / 60000} minutos`);
console.log('Pressione Ctrl+C para encerrar\n');

// Executa a primeira verificação imediatamente
checkWebsite();

// Configura o intervalo para as próximas verificações
const intervalId = setInterval(checkWebsite, CHECK_INTERVAL);

// Tratamento para encerramento limpo
process.on('SIGINT', () => {
  clearInterval(intervalId);
  console.log('\nEncerrando monitoramento...');
  process.exit(0);
});
