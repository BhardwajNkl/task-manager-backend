import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';

export const getWinstonLogger=(configService: ConfigService):winston.Logger =>{
    const logger = winston.createLogger({
        level: 'info', // Base log level.
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
        ),
        // defaultMeta: { service: configService.get<string>('APP_NAME') },
        transports: [
            new winston.transports.File({ filename: 'error.log', level: 'error' }), // Error and higher severity logs go to this file.
            new winston.transports.File({ filename: 'combined.log' }), // All logs including base level and above go to this file.
        ],
    });
    return logger;
}