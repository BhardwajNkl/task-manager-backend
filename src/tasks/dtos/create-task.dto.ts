import {IsString, IsNotEmpty} from 'class-validator';
export class CreateTaskDto{
    @IsString()
    @IsNotEmpty()
    title:string;

    @IsString()
    @IsNotEmpty()
    description:string;

    @IsString()
    @IsNotEmpty()
    status:string;

    @IsString()
    @IsNotEmpty()
    priority:string;
}