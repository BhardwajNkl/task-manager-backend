import { SequelizeModuleOptions } from "@nestjs/sequelize";

export const sequelizeConfig: SequelizeModuleOptions = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'task-manager-nest',
    synchronize: true,
    autoLoadModels: true // Loads all the models registered using Sequelize.forFeature()
}