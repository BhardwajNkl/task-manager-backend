import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import {sequelizeConfig} from '../../config/sequelize.config';

@Module({
    imports: [
        SequelizeModule.forRoot(sequelizeConfig) // this is a hardcode configuration. see if we can use environement in that file.
    ],
    providers: [],
    exports: [SequelizeModule]
})
export class DataBaseModule {
}