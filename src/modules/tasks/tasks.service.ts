import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { CreateTaskDto } from '../tasks/dtos/create-task.dto';
import { UpdateTaskDto } from '../tasks/dtos/update-task.dto';
import { RabbitManagerService } from 'src/shared/rabbit-manager/rabbit-manager.service';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task) private readonly taskModel: typeof Task,
        private readonly rabbitManagerService: RabbitManagerService
    ){}

    async createTask(createTaskDto: CreateTaskDto):Promise<Task>{
        const newTask = this.taskModel.build({...createTaskDto});
        await newTask.save();
        // Publish a message to the queue.
        await this.rabbitManagerService.publish("task_notification_q", `Task created. Task id:${newTask.id}`);
        return newTask;
    }

    async getTasks():Promise<Task[]>{
        return this.taskModel.findAll(); // no need of await.
    }

    async getTaskById(id: number): Promise<Task>{
        const task = await this.taskModel.findByPk(id);
        if(!task){
            throw new NotFoundException(`Task does not exist`);
        }
        return task;
    }

    async updateTask(updateTaskDto:UpdateTaskDto): Promise<Task>{
        const task = await this.taskModel.findByPk(updateTaskDto.id);
        if(!task){
            throw new NotFoundException(`Task does not exist!`);
        }
        await task.update({...updateTaskDto});

        // Publish a message to the queue.
        await this.rabbitManagerService.publish("task_notification_q", `Task updated. Task id:${task.id}`);
        return task;
    }

    async deleteTask(id:number):Promise<void>{
        const task = await this.taskModel.findByPk(id);
        if(!task){
            throw new NotFoundException(`Task does not exist`);
        }
        await task.destroy();
        
        // Publish a message to the queue.
        this.rabbitManagerService.publish("task_notification_q", `Task deleted! Task id: ${id}`);
    }
}
