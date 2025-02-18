import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/interceptors/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allExceptionsFilter = app.get(AllExceptionsFilter);
  app.useGlobalFilters(allExceptionsFilter);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 3003,
    },
  });
  await app.startAllMicroservices();
  await app.listen(3003);
}
bootstrap();
