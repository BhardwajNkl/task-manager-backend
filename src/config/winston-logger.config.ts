import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';

import * as fs from 'fs/promises';
import * as path from 'path';

export const getWinstonLogger= async (configService: ConfigService):Promise<winston.Logger> =>{
    const logDirectory = configService.get<string>('WINSTON_LOG_DIR')
    try{
        await fs.access(logDirectory);
    } catch(error){
        await fs.mkdir(logDirectory);
    }
    
    const logger = winston.createLogger({
        level: 'info', // Base log level.
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
        ),
        // defaultMeta: { service: configService.get<string>('APP_NAME') },
        transports: [
            new winston.transports.File({ filename: path.join(logDirectory, 'error.log') , level: 'error' }), // Error and higher severity logs go to this file.
            new winston.transports.File({ filename: path.join(logDirectory, 'combined.log') }), // All logs including base level and above go to this file.
        ],
    });
    return logger;
}