import { createLogger as winston, Logger, transports, addColors, format } from 'winston';
const { combine, label, timestamp, printf } = format;

const myFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

console.log(myFormat);

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
    format: combine(
      label({ label: loggerLabel }),
      timestamp(),
      // myFormat,
      format.colorize()
    )
  });
}

export const logger = createLogger('Server');

export { Logger };
