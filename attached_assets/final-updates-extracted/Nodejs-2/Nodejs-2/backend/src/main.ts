import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({ origin: (origin, cb) => {
    const allow = (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',').map(s=>s.trim());
    if (!origin || allow.includes(origin)) return cb(null, true);
    return cb(new Error('CORS blocked'), false);
  }, credentials: true });
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('HVAC API')
    .setDescription('Generated API docs')
    .setVersion('1.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/v1/docs', app, document, { swaggerOptions: { persistAuthorization: true } });

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`✅ Backend server running on port ${port}`);
  console.log(`✅ API available at http://localhost:${port}/api/v1`);
}
bootstrap();
