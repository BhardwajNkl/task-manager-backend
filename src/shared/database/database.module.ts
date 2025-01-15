import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import {getSequelizeConfig} from '../../config/sequelize.config';
import { ConfigService } from "@nestjs/config";

/**
 * This module provides the database connection.
 * 
 * It imports the 'SequelizeModule' and configures it to connect to database server.
 * It re-exports the 'SequelizeModule'. So, by importing 'DataBaseModule', we get 'Sequelize' providers as well.
 */
@Module({
    imports: [
        SequelizeModule.forRootAsync({
            inject:[ConfigService], // Instance of the ConfigService is injected to retrieve environment variables.
            useFactory:(configService:ConfigService)=> getSequelizeConfig(configService) // Loads the configuration options object.
        })
    ],
    providers: [],
    exports: [SequelizeModule]
})
export class DataBaseModule {
}