/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);
  const config = new DocumentBuilder()
        .setTitle('E-commerce store backend API')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('git: @klishin16')
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document)

    app.enableCors({
      methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
      allowedHeaders: ['Authorization', 'content-type', 'x-requested-with'],
      credentials: true,
  })
  app.useGlobalPipes(new ValidationPipe())
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
