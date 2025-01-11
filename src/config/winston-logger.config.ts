import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';

export const getWinstonLogger=(configService: ConfigService):winston.Logger =>{
    const logger = winston.createLogger({
        level: 'info', // base log level. will log anything higher too.
        format: winston.format.json(),
        defaultMeta: { service: configService.get<string>('APP_NAME') }, // OPTIONAL. generally used for identifying the source of log in a microservice architecture. we can also use for other data as per need.
        transports: [
            new winston.transports.File({ filename: 'error.log', level: 'error' }), // error and higher logs go to this file.
            new winston.transports.File({ filename: 'combined.log' }), // all logs[we have already provided info as base, so all=info and higher] will go in this file.
        ],
    });
    return logger;
}