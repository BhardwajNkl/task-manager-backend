import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task } from './task.model';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

/**
 * Controller for managing tasks.
 * 
 * This controller handles all task related requests such as creating, updating, fetching and deleting tasks.
 * The base route for this controller is '/tasks'
 */

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
    ){}

    /**
     * Create task.
     * 
     * This endpoint is used to create a new task by using the data provided in request body.
     * 
     * @param createTaskDto The DTO containing task details. This is validated using the 'ValidationPipe' as per the checks defined in the 'CreateTaskDto'. 
     * @returns The created task object.
     */
    @Post()
    async createTask(@Body(ValidationPipe) createTaskDto: CreateTaskDto):Promise<Task>{
        return this.tasksService.createTask(createTaskDto);
    }

    /**
     * Get all tasks.
     * 
     * This endpoint retrieves all tasks in the system.
     * This API's response is cached with a 1 minute TTL duration. So, we get cached results if present.
     * 
     * @returns The list of tasks.
     */
    @Get()
    @UseInterceptors(CacheInterceptor) // Caching the results of this API.
    @CacheTTL(60000) // 1 Minute cache expiration.
    async getTasks():Promise<Task[]>{
        return this.tasksService.getTasks();
    }

    /**
     * Get task by Id.
     * 
     * This endpoint fetches a task based on it's Id.
     * 
     * @param id The Id of the task to fetch. It is received as a string but converted to number using 'ParseIntPipe'.
     * @returns The task object.
     */
    @Get(':id')
    async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task>{
        return this.tasksService.getTaskById(id);
    }

    /**
     * Update a task.
     * 
     * This endpoint updates the details of an existing task identified by its ID.
     * 
     * @param updateTaskDto The DTO containing the Id of the task and other details to be updated. This is validated using the 'ValidationPipe' as per the checks defined in the 'UpdateTaskDto'. 
     * @returns Updated task.
     */
    @Put()
    async updateTask(@Body(ValidationPipe) updateTaskDto:UpdateTaskDto): Promise<Task>{
        return this.tasksService.updateTask(updateTaskDto);
    }

    /**
     * Delete task.
     * 
     * This endpoint deletes a task based on it's Id.
     * 
     * @param id The Id of the task to be deleted. It is received as a string but converted to number using 'ParseIntPipe'. 
     * @returns void.
     */
    @Delete(':id')
    async deleteTask(@Param('id', ParseIntPipe) id:number):Promise<void>{
        await this.tasksService.deleteTask(id);
        return;
    }
}
