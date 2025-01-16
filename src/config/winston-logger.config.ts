import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';

import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * Method to configure a winston logger.
 * 
 * @param configService : An instance of the ConfigService used to retrieve environment variables.
 * @returns {Promise<winston.Logger>} : A winston logger intance.
 */
export const getWinstonLogger= async (configService: ConfigService):Promise<winston.Logger> =>{
    // Create a dedicated directory to put log files.
    const logDirectory = configService.get<string>('WINSTON_LOG_DIR');
    try{
        await fs.access(logDirectory); // Check if the directory already exists.
    } catch(error){
        await fs.mkdir(logDirectory); // Create directory.
    }
    
    const logger = winston.createLogger({
        level: 'info', // Base log level.

        // Logs will be saved in JSON format with timestamp.
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
        ),

        transports: [
            new winston.transports.File({ filename: path.join(logDirectory, 'error.log') , level: 'error' }), // Error logs will be saved in this file.
            new winston.transports.File({ filename: path.join(logDirectory, 'combined.log') }), // All logs with level 'info' or higher  will be saved in this file.
        ],
    });
    return logger;
}