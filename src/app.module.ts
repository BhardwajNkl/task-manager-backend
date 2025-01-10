import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './modules/tasks/tasks.module';
import { DataBaseModule } from './shared/database/database.module';
import { LoggerModule } from './shared/logger/logger.module';

@Module({
  imports: [
    TasksModule,
    DataBaseModule, // database module uses the sequelize module and exports it.
    LoggerModule // logger module uses the winston module and exports it.
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}