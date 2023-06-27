import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'
import { HttpExceptionFilter } from './filters/http-exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = app.get<ConfigService>(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(config.get('PORT'));
}

bootstrap();
