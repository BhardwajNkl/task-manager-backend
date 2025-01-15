import {IsString, IsNotEmpty, IsOptional, IsEnum} from 'class-validator';
import { TaskPriority } from 'src/common/enums/task-priority.enum';
import { TaskStatus } from 'src/common/enums/task-status.enum';
/**
 * DTO for creating a new task.
 */
export class CreateTaskDto{
    /**
     * Title of the task.
     * Must be a non-empty string.
     */
    @IsString()
    @IsNotEmpty()
    title:string;

    /**
     * Description of the task.
     * Must be a non-empty string.
     */
    @IsString()
    @IsNotEmpty()
    description:string;

    /**
     * Status of the task.
     * It is an optional field. If not provided, a default value will be used.
     * Valid values are defined in the {TaskStatus} enum.
     */
    @IsOptional()
    @IsEnum(TaskStatus, {message:`Status must be one of these: ${Object.values(TaskStatus)}`})
    status:string;

    /**
     * Priority of the task.
     * It is an optional field. If not provided, a default value will be used.
     * Valid values are defined in the {TaskPriority} enum.
     */
    @IsOptional()
    @IsEnum(TaskPriority, {message:`Priority must be one of these: ${Object.values(TaskPriority)}`})
    priority:string;
}