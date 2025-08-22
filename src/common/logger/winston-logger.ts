import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

export const WinstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('PM-API', {
          prettyPrint: true,
        }),
      ),
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
  ],
});
