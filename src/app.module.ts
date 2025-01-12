import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './modules/tasks/tasks.module';
import { DataBaseModule } from './shared/database/database.module';
import { LoggerModule } from './shared/logger/logger.module';
import {ConfigModule} from '@nestjs/config';
import { CacheConfigModule } from './shared/cache/cache-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    DataBaseModule, // Database module uses the sequelize module and exports it.
    LoggerModule, // Logger module uses the winston module and exports it.
    CacheConfigModule, // Cache config module uses CacheModule and exports it. It is global.
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}