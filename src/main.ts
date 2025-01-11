import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Get config service so we can access environment variables.
  const configService:ConfigService = app.get(ConfigService);
  
  // Get the Winston logger.
  const logger: Logger = app.get(WINSTON_MODULE_PROVIDER);

  // Use a global interceptor for logging.
  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  const appPort = configService.get<number>('APP_PORT');
  await app.listen(appPort);
}
bootstrap();
