import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './task.model';
/**
 * The tasks module is responsible for task related functionality.
 * 
 * - It registers a 'TasksController' that exposes endpoints to manage tasks.
 * - It provides 'TasksService' for task related business logic.
 * - It imports 'Sequelize' module for database related operations and registers the 'Task' model with it.
 */
@Module({
  imports:[SequelizeModule.forFeature([Task])], // Import Sequelize module and register the 'Task' model with it.
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
