import { createLogger as winston, Logger, transports, addColors, format } from 'winston';

addColors({
  info: 'blue',
  log: 'gray',
  error: 'red',
  warn: 'orange'
});

export function createLogger(loggerLabel: string): Logger {
  return winston({
    level: 'info',
    transports: [
      new transports.Console()
    ],
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.label({ label: loggerLabel }),
      format.printf(info => {
        return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
      })
    )
  });
}

export const logger = createLogger('Server');

export { Logger };
