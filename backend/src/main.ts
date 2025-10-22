import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { SpaFilter } from './spa.filter';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Serve static files from frontend/dist
  app.use(express.static(join(__dirname, '..', '..', '..', 'frontend', 'dist')));
  
  // NOTE: WebSocket disabled - engine.io has persistent compatibility issues with NestJS HTTP server
  // Real-time notifications use HTTP polling (30-second interval) as production solution
  // Polling endpoint: GET /api/v1/notifications
  // WebSocket can be revisited when engine.io v7+ resolves HTTP server attachment issues
  // app.useWebSocketAdapter(new CustomSocketIoAdapter(app));
  
  app.use(helmet({
    contentSecurityPolicy: false,
  }));
  
  const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
    : ['http://localhost:5000', 'http://0.0.0.0:5000'];
  
  app.enableCors({ 
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });
  app.setGlobalPrefix('api/v1', {
    exclude: ['/'],
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new SpaFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('OpsNex API')
    .setDescription('OpsNex HVAC Operations Management Platform API')
    .setVersion('1.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/v1/docs', app, document, { swaggerOptions: { persistAuthorization: true } });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`✅ OpsNex running on port ${port}`);
  console.log(`✅ Web Application: http://0.0.0.0:${port}/`);
  console.log(`✅ API: http://0.0.0.0:${port}/api/v1`);
  console.log(`✅ Swagger docs: http://0.0.0.0:${port}/api/v1/docs`);
}
bootstrap();
