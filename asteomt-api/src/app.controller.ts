import { Controller, Get, Post, HttpStatus, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  healthCheck(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      env: process.env.NODE_ENV || 'development',
    });
  }

  @Get('ping')
  ping() {
    return { status: 'pong', timestamp: new Date().toISOString() };
  }

  @Get('health/keep-alive-db')
  async keepAliveDbGet() {
    return this.appService.executarCicloKeepAlive();
  }

  @Post('health/keep-alive-db')
  async keepAliveDbPost() {
    return this.appService.executarCicloKeepAlive();
  }
}

