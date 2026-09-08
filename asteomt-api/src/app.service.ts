import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(AppService.name);
  private keepAliveInterval: NodeJS.Timeout | null = null;
  private initialTimeout: NodeJS.Timeout | null = null;

  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  onModuleInit() {
    const ONE_DAY_MS = 24 * 60 * 60 * 1000;

    // Executa um ciclo inicial 15 segundos após a inicialização
    this.initialTimeout = setTimeout(() => {
      this.executarCicloKeepAlive().catch((err) =>
        this.logger.error('Erro no ciclo inicial de keep-alive do banco:', err),
      );
    }, 15000);

    // Agenda para executar a cada 1 dia (24 horas)
    this.keepAliveInterval = setInterval(() => {
      this.logger.log('Iniciando ciclo diário de keep-alive no banco de dados...');
      this.executarCicloKeepAlive().catch((err) =>
        this.logger.error('Erro no ciclo diário de keep-alive do banco:', err),
      );
    }, ONE_DAY_MS);
  }

  onModuleDestroy() {
    if (this.initialTimeout) clearTimeout(this.initialTimeout);
    if (this.keepAliveInterval) clearInterval(this.keepAliveInterval);
  }

  /**
   * 1. Função que envia 1 dado para o banco de dados
   */
  async enviarDadoKeepAlive(): Promise<string> {
    const id = `keepalive_${Date.now()}`;
    await this.prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "_KeepAlive" (
        id VARCHAR(100) PRIMARY KEY,
        source VARCHAR(50) DEFAULT 'system_cron',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      INSERT INTO "_KeepAlive" (id, source, created_at) VALUES ('${id}', 'keep_alive_cycle', NOW());
    `);
    this.logger.log(`[Keep-Alive] 1 dado enviado com sucesso ao banco de dados (ID: ${id})`);
    return id;
  }

  /**
   * 2. Função que retira esse dado do banco de dados
   */
  async retirarDadoKeepAlive(id?: string): Promise<number> {
    let query = `DELETE FROM "_KeepAlive"`;
    if (id) {
      query += ` WHERE id = '${id}'`;
    }
    const count = await this.prisma.$executeRawUnsafe(query);
    this.logger.log(`[Keep-Alive] Dado retirado com sucesso do banco de dados (ID: ${id || 'todos'})`);
    return count;
  }

  /**
   * Executa o ciclo completo: envia 1 dado e em seguida retira,
   * gerando atividade no banco de dados para evitar inatividade.
   */
  async executarCicloKeepAlive() {
    const id = await this.enviarDadoKeepAlive();

    // Pequena pausa de 500ms entre o envio e a remoção
    await new Promise((resolve) => setTimeout(resolve, 500));

    const removidos = await this.retirarDadoKeepAlive(id);

    return {
      success: true,
      message: 'Ciclo keep-alive executado: 1 dado enviado e retirado do banco de dados.',
      registroId: id,
      removidos,
      timestamp: new Date().toISOString(),
    };
  }
}
