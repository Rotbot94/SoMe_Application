import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 4000);
  console.log(process.env.DB_PORT);
  console.log(process.env.DB_HOST);
  console.log(process.env.DB_USERNAME);
  console.log(process.env.DB_PASSWORD);
  console.log(process.env.DB_DATABASE);
}
bootstrap();
