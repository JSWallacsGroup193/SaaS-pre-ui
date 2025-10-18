import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ProblemDetailsFilter } from './common/problem.filter';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((req, res, next) => {
  (res as any).locals = (res as any).locals || {};
  (res as any).locals.cspNonce = (Math.random().toString(36).slice(2));
  next();
});
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "script-src": ["'self'", (req, res) => `'nonce-${(res as any).locals.cspNonce}'`],
    }
  },
  hsts: process.env.NODE_ENV === 'production' ? { maxAge: 15552000 } : false,
} as any));

  app.enableCors({ origin: (origin, cb) => {
    const allow = (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',').map(s=>s.trim());
    if (!origin || allow.includes(origin)) return cb(null, true);
    return cb(new Error('CORS blocked'), false);
  }, credentials: true });
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new ProblemDetailsFilter());

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
