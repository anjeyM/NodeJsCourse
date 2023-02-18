import * as winston from 'winston';
import * as path from 'path';

const logFormat = winston.format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)

export const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: winston.format.combine(
        winston.format.label({ label: path.basename(__filename) }),
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] })
      ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                logFormat
            )
        }),
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exceptions.log' })
    ],
});
