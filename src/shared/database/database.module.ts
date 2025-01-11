import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import {getSequelizeConfig} from '../../config/sequelize.config';
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        SequelizeModule.forRootAsync({
            inject:[ConfigService],
            useFactory:(configService:ConfigService)=> getSequelizeConfig(configService)
        })
    ],
    providers: [],
    exports: [SequelizeModule]
})
export class DataBaseModule {
}