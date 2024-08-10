import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');
  
  const config = new DocumentBuilder()
    .setTitle('BUDGET API')
    .setDescription('API para o aplicativo Budget')
    .setVersion('0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, skipMissingProperties: true }),
  );

  await app.listen(3000);
}
bootstrap();
