import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './modules/tasks/tasks.module';
import { DataBaseModule } from './shared/database/database.module';

@Module({
  imports: [TasksModule, DataBaseModule], // database module uses the sequelize module and exports it.
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}