import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task } from './task.model';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
    ){}

    @Post()
    async createTask(@Body(ValidationPipe) createTaskDto: CreateTaskDto):Promise<Task>{
        return this.tasksService.createTask(createTaskDto);
    }

    @Get()
    async getTasks():Promise<Task[]>{
        return this.tasksService.getTasks();
    }

    @Get(':id')
    async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task>{
        return this.tasksService.getTaskById(id);
    }

    @Put()
    async updateTask(@Body(ValidationPipe) updateTaskDto:UpdateTaskDto): Promise<Task>{
        return this.tasksService.updateTask(updateTaskDto);
    }

    @Delete(':id')
    async deleteTask(@Param('id', ParseIntPipe) id:number):Promise<void>{
        await this.tasksService.deleteTask(id);
        return;
    }
}
