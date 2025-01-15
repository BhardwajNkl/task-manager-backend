import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { CreateTaskDto } from '../tasks/dtos/create-task.dto';
import { UpdateTaskDto } from '../tasks/dtos/update-task.dto';
import { RabbitManagerService } from 'src/shared/rabbit-manager/rabbit-manager.service';
/**
 * This class has all the business logic for task management such as creating, updating, finding and deleting tasks.
 */
@Injectable()
export class TasksService {
    constructor(
        // Inject the Sequelize model representing tasks. Used for database operations.
        @InjectModel(Task) private readonly taskModel: typeof Task,

        // Inject Rabbit MQ service provided by 'RabbitManagerModule'. Used to publish messages to the queue.
        private readonly rabbitManagerService: RabbitManagerService
    ){}

    /**
     * Create task.
     * 
     * @param createTaskDto The DTO containing details of the task to be created.
     * @returns A promise that resolves to the newly created task.
     */
    async createTask(createTaskDto: CreateTaskDto):Promise<Task>{
        const newTask = this.taskModel.build({...createTaskDto}); // Build a 'Task' instance.
        await newTask.save(); // Save to database.

        // Publish a message to the 'message queue' to register this task create event.
        await this.rabbitManagerService.publish("task_notification_q", `Task created. Task id:${newTask.id}`);
        
        return newTask;
    }

    /**
     * Get tasks.
     * 
     * @returns A promise that resolves to the list of all tasks.
     */
    async getTasks():Promise<Task[]>{
        return this.taskModel.findAll();
    }

    /**
     * Get task by Id.
     * 
     * @param id Id of the task to be fetched.
     * @returns A promise that resolves to the task with the given Id.
     */
    async getTaskById(id: number): Promise<Task>{
        const task = await this.taskModel.findByPk(id); // Find task by primary key, i.e., the Id.
        if(!task){
            throw new NotFoundException(`Task does not exist!`);
        }
        return task;
    }

    /**
     * Update task.
     * 
     * @param updateTaskDto The DTO containing Id of the task to be updated along with the details to be updated.
     * @returns A promise that resolves to the updated task.
     */
    async updateTask(updateTaskDto:UpdateTaskDto): Promise<Task>{
        const task = await this.taskModel.findByPk(updateTaskDto.id); // Find task by primary key, i.e., the Id.
        if(!task){
            throw new NotFoundException(`Task does not exist!`);
        }
        await task.update({...updateTaskDto}); // Update in database.

        // Publish a message to the 'message queue' to register this task update event.
        await this.rabbitManagerService.publish("task_notification_q", `Task updated. Task id:${task.id}`);
        return task;
    }

    /**
     * Delete a task.
     * 
     * @param id Id of the task to be deleted.
     */
    async deleteTask(id:number):Promise<void>{
        const task = await this.taskModel.findByPk(id);
        if(!task){
            throw new NotFoundException(`Task does not exist`);
        }
        await task.destroy();
        
        // Publish a message to the 'message queue' to register this task delete event.
        this.rabbitManagerService.publish("task_notification_q", `Task deleted! Task id: ${id}`);
    }
}
