import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'task-manager-nest',
            synchronize: true,
            autoLoadModels: true // Loads all the models registered using Sequelize.forFeature()
        })
    ],
    providers: [],
    exports: [SequelizeModule]
})
export class DataBaseModule {

}