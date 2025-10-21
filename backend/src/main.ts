import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { SpaFilter } from './spa.filter';
import * as express from 'express';
import { join } from 'path';
import { CustomSocketIoAdapter } from './common/socket-io.adapter';
import * as http from 'http';

// Polyfill for Node.js 22 compatibility with Socket.IO/engine.io
// Node.js 22 removed the .listeners() method from EventEmitter API
// but engine.io still relies on it
const OriginalServer = http.Server;
if (!OriginalServer.prototype.listeners) {
  OriginalServer.prototype.listeners = function(eventName: string) {
    return this.rawListeners(eventName);
  };
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Serve static files from frontend/dist
  app.use(express.static(join(__dirname, '..', '..', '..', 'frontend', 'dist')));
  
  // NOTE: WebSocket disabled due to engine.io incompatibility with Node.js 22
  // The system uses HTTP polling (30s interval) as a reliable fallback
  // Real-time notifications still work via /api/v1/notifications endpoint
  // To enable WebSocket: downgrade to Node.js 20 or wait for engine.io v7+ update
  // app.useWebSocketAdapter(new CustomSocketIoAdapter(app));
  
  app.use(helmet({
    contentSecurityPolicy: false,
  }));
  app.enableCors({ 
    origin: true,
    credentials: true 
  });
  app.setGlobalPrefix('api/v1', {
    exclude: ['/'],
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new SpaFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('HVAC API')
    .setDescription('Generated API docs')
    .setVersion('1.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/v1/docs', app, document, { swaggerOptions: { persistAuthorization: true } });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`✅ HVAC Management System running on port ${port}`);
  console.log(`✅ Web Application: http://0.0.0.0:${port}/`);
  console.log(`✅ API: http://0.0.0.0:${port}/api/v1`);
  console.log(`✅ Swagger docs: http://0.0.0.0:${port}/api/v1/docs`);
}
bootstrap();
