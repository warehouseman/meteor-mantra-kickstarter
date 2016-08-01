import winston from 'winston';
import { Levels } from '../winston_levels';
import transFile from './transFile';
import transLoggly from './transLoggly';
require('winston-loggly-bulk');

const transConsole = new (winston.transports.Console)({
  name: 'info-console',
  colorize: true,
  level: 'silly',
  stderrLevels: [ 'error', 'warn' ]
});

const customLevels = {};
customLevels.levels = Levels.levels;
customLevels.colors = Levels.colors;

winston.addColors(customLevels.colors);


export default class {

  constructor() {

    this.logger = new (winston.Logger)({
      levels: customLevels.levels,
      transports: [
        transFile,
        transLoggly,
        transConsole
      ]
    });

  }

  log( level, msg, params ) {
    this.logger.log(level, msg, params);
  }
}
