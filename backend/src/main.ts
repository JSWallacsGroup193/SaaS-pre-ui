import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({ origin: (origin, cb) => {
    const allow = (process.env.CORS_ORIGIN || 'http://localhost:5000').split(',').map(s=>s.trim());
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

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`✅ Backend server running on port ${port}`);
  console.log(`✅ API available at http://0.0.0.0:${port}/api/v1`);
  console.log(`✅ Swagger docs at http://0.0.0.0:${port}/api/v1/docs`);
  console.log(`✅ Root health check at http://0.0.0.0:${port}/`);
}
bootstrap();
