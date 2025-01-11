import { ConfigService } from "@nestjs/config";
import { SequelizeModuleOptions } from "@nestjs/sequelize";

type dbDialect = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';

export const getSequelizeConfig = (configService: ConfigService): SequelizeModuleOptions => {
    const configOptionsObject:SequelizeModuleOptions = {
        dialect: configService.get<dbDialect>('DB_DIALECT'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        synchronize: configService.get<boolean>('DB_SYNC_ENABLE'),
        autoLoadModels: configService.get<boolean>('DB_AUTO_LOAD_MODELS_ENABLE'),
    }
    return configOptionsObject;
}