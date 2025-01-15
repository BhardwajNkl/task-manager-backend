import { PartialType } from '@nestjs/mapped-types'
import { CreateTaskDto } from './create-task.dto';
import { IsNumber } from 'class-validator';
/**
 * DTO for updating a task.
 * By extending using 'PartialType', we ensure that this class gets all the fields that the {CreateTaskDto} class has.
 * The inherited fields bring the same validation checks as well. Also, these inherited fields are optional.
 * Additionally, we can have other fields too, as here we have an 'id' field.
 */
export class UpdateTaskDto extends PartialType(CreateTaskDto){
    /**
     * Id of the task to be updated.
     * Must be a number.
     */
    @IsNumber()
    id:number;

    // ... inherited fileds(and corresponding validations) from {CreateTaskDto}
}