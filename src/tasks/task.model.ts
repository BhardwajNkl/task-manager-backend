import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import {TaskPriority} from '../common/enums/task-priority.enum';
import {TaskStatus} from '../common/enums/task-status.enum'

@Table({
    timestamps:true
})
export class Task extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id:number;

    @Column({
        allowNull:false
    })
    title:string;

    @Column({
        allowNull:false
    })
    description:string;

    @Column({
        type: DataType.ENUM(...Object.values(TaskStatus)),
        allowNull: false,
      })
    status:TaskStatus;

    @Column({
        type: DataType.ENUM(...Object.values(TaskPriority)),
        allowNull: false,
      })
    priority:TaskPriority;
}