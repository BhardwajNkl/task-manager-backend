import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [TasksModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'task-manager-nest',
      synchronize: true,
      autoLoadModels:true // Loads all the models registered using Sequelize.forFeature()
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
