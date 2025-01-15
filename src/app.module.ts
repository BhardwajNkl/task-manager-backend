import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './modules/tasks/tasks.module';
import { DataBaseModule } from './shared/database/database.module';
import { LoggerModule } from './shared/logger/logger.module';
import {ConfigModule} from '@nestjs/config';
import { CacheConfigModule } from './shared/cache/cache-config.module';
import { RabbitManagerModule } from './shared/rabbit-manager/rabbit-manager.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true // 
    }),
    DataBaseModule, // DataBaseModule configures the 'SequelizeModule' with database connection properties and exports it.
    LoggerModule, // LoggerModule configures the 'WinstonModule' and exports it.
    CacheConfigModule, // CacheConfigModule configures the 'CacheModule' and exports it.
    RabbitManagerModule, // This module provides RabbitMq broker connection and communication functionalities.
    TasksModule, // This module provides task management functionality.
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}