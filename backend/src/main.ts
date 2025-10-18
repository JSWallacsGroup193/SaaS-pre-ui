import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true, credentials: true });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const cfg = new DocumentBuilder()
    .setTitle('HVAC API')
    .setDescription('Docs for Inventory, Purchasing, Forecast')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const doc = SwaggerModule.createDocument(app, cfg);
  SwaggerModule.setup('api/docs', app, doc);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Backend server running on port ${port}`);
}
bootstrap();
