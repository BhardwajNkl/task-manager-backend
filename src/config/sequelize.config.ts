import { ConfigService } from "@nestjs/config";
import { SequelizeModuleOptions } from "@nestjs/sequelize";

/**
 * The type alias for Sequelize database dialect.
 * We use it to fetch database dialect environment variable.
 */
type dbDialect = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';


/**
 * Method for configuring sequelize module registration options object.
 * 
 * @param {configService} configService : instance of the ConfigService used to retrieve environment variables.
 * @returns {SequelizeModuleOptions} : An object containing Sequelize connection configurations.
 */
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