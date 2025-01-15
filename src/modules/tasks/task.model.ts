import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import {TaskPriority} from '../../common/enums/task-priority.enum';
import {TaskStatus} from '../../common/enums/task-status.enum'

/**
 * Entity representing the 'tasks' table in database.
 */

@Table({
    timestamps:true // 'Resource created at' and 'resource updated at' are managed by Seqeulize.
})
export class Task extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id:number; // Primary key.

    @Column({
        allowNull:false, // Title must be provided.
        unique:true // Title must be unique.
    })
    title:string;

    @Column({
        allowNull:false // Description must be provided.
    })
    description:string;

    @Column({
        type: DataType.ENUM(...Object.values(TaskStatus)), // Status must have a value as defined inside the {TaskStatus} enum.
        defaultValue: TaskStatus.PENDING, // Deafult value of 'PENDING'.
        allowNull: false,
      })
    status:TaskStatus;

    @Column({
        type: DataType.ENUM(...Object.values(TaskPriority)), // Priority must have a value as defined inside the {TaskPriority} enum.
        defaultValue: TaskPriority.LOW, // Default value of 'LOW'.
        allowNull: false,
      })
    priority:TaskPriority;
}