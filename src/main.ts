import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:4200', 'https://hos-test.vercel.app'],
  });
  app.setGlobalPrefix('hos-be')
  await app.listen(3000);
}
bootstrap();
