import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('API Posyandu Modern')
    .setDescription('Dokumentasi Backend untuk Aplikasi Kader Posyandu')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  // Gunakan Scalar sebagai interface
  const scalarConfig = {
    spec: {
      content: document,
    },
  } as any;

  app.use('/reference', apiReference(scalarConfig));

  await app.listen(3000);
  console.log(`Application is running on: http://localhost:3000/reference`);
}
bootstrap();