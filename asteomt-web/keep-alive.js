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
const API_URL = 'https://asteomt-api.onrender.com/health'; // Supondo endpoint /health
const CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutos
const TIMEOUT = 30000; // 30 segundos

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

// Função principal para verificar o site
async function checkWebsite() {
  const startTime = Date.now();
  const timestamp = getFormattedDate();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

    const response = await fetch(SITE_URL, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'ASTEOMT-KeepAlive/1.0 (+https://asteomt.com.br)'
      }
    });

    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;

    console.log(`[${timestamp}] ${colors.green}✅ Online${colors.reset} | Status: ${response.status} | Tempo: ${responseTime}ms`);

  } catch (error) {
    const errorType = error.name === 'AbortError' ? 'Timeout' : 'Erro';
    console.error(`[${timestamp}] ${colors.red}❌ ${errorType}${colors.reset} | ${error.message}`);
  }
}

// Mensagem inicial
console.log(`${colors.bright}${colors.blue}=== Monitoramento ASTEOMT ===${colors.reset}`);
console.log(`Site: ${SITE_URL}`);
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
