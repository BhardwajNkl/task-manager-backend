import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { CreateTaskDto } from '../tasks/dtos/create-task.dto';
import { UpdateTaskDto } from '../tasks/dtos/update-task.dto';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task) private readonly taskModel: typeof Task){}

    async createTask(createTaskDto: CreateTaskDto):Promise<Task>{
        const newTask = this.taskModel.build({...createTaskDto});
        return newTask.save(); // no await as we dont need further processing here. returns a promise.
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
        return task.update({...updateTaskDto}); // no need of await
    }

    async deleteTask(id:number):Promise<void>{
        const task = await this.taskModel.findByPk(id);
        if(!task){
            throw new NotFoundException(`Task does not exist`);
        }
        await task.destroy();
    }
}
