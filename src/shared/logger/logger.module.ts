import { Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import {getWinstonLogger} from '../../config/winston-logger.config';
import { ConfigService } from "@nestjs/config";

@Module({
    imports:[
        WinstonModule.forRootAsync({
            inject:[ConfigService],
            useFactory:(configService:ConfigService)=>getWinstonLogger(configService)
        })
    ],
    providers:[],
    exports:[WinstonModule]
})
export class LoggerModule{

}