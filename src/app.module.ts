import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './modules/tasks/tasks.module';
import { DataBaseModule } from './shared/database/database.module';
import { LoggerModule } from './shared/logger/logger.module';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    DataBaseModule, // database module uses the sequelize module and exports it.
    LoggerModule, // logger module uses the winston module and exports it.
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}