import { Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import {winstonLogger} from '../../config/winston-logger.config';

@Module({
    imports:[
        WinstonModule.forRoot(winstonLogger) // this is a hardcode configuration. see if we can use environement in that file.
    ],
    providers:[],
    exports:[WinstonModule]
})
export class LoggerModule{

}