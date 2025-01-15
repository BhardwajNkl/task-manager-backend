import { Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import {getWinstonLogger} from '../../config/winston-logger.config';
import { ConfigService } from "@nestjs/config";

/**
 * This module provides the logging functionality.
 * 
 * It imports the 'WinstonModule' and configures it with a winston logger.
 * It re-exports the 'WinstonModule'. So, by importing 'LoggerModule', we get 'WinstonModule' providers as well. The 'WINSTON_MODULE_PROVIDER' provider is the one that we will be using for injecting the logger.
 * 
 */
@Module({
    imports:[
        WinstonModule.forRootAsync({
            inject:[ConfigService], // Instance of the ConfigService is injected to retrieve environment variables.
            useFactory:(configService:ConfigService)=>getWinstonLogger(configService) // Get a well configured winston logger.
        })
    ],
    providers:[],
    exports:[WinstonModule]
})
export class LoggerModule{

}