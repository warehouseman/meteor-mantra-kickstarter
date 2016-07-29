import { Levels } from '../winston_levels';
import Logger from './winston.js';
import LoggerUtils from '../utilsLogging';

const coords = LoggerUtils.coords;
const logger = new Logger();


class Logs {

  constructor( f, l, c ) {
    this.f = f;
    this.l = l;
    this.c = c;
  }

  error(msg) {
    let parms = coords(this);
    if ( Levels.levels[this.l] >= 0) {
      logger.log( 'error', msg, parms);
    }
  }

  warn(msg) {
    let parms = coords(this);
    if ( Levels.levels[this.l] >= 1) {
      logger.log( 'warn', msg, parms);
    }
  }

  info(msg) {

    let parms = coords(this);
    if ( Levels.levels[this.l] >= 2) {
      logger.log( 'info', msg, parms);
    }
  }


  verbose(msg) {
    let parms = coords(this);
    if ( Levels.levels[this.l] >= 3) {
      logger.log( 'verbose', msg, parms);
    }
  }

  debug(msg) {
    let parms = coords(this);
    if ( Levels.levels[this.l] >= 4) {
      logger.log( 'debug', msg, parms);
    }
  }

  silly(msg) {
    let parms = coords(this);
    if ( Levels.levels[this.l] >= 5) {
      logger.log( 'silly', msg, parms);
    }
  }


}

Logs[Levels.ary[0].toLowerCase()] = (msg) => {
  let parms = coords(Logs);
  logger.log([ Levels.ary[0].toLowerCase() ], msg, parms);
};


Logs[Levels.ary[1].toLowerCase()] = (msg) => {
  let parms = coords(Logs);
  logger.log([ Levels.ary[1].toLowerCase() ], msg, parms);
};


Logs[Levels.ary[2].toLowerCase()] = (msg) => {
  let parms = coords(Logs);
  if ( Levels.levels[Logs.l] >= 2) {
    logger.log([ Levels.ary[2].toLowerCase() ], msg, parms);
  }
};


Logs[Levels.ary[3].toLowerCase()] = (msg) => {
  let parms = coords(Logs);
  logger.log([ Levels.ary[3].toLowerCase() ], msg, parms);
};


Logs[Levels.ary[4].toLowerCase()] = (msg) => {
  let parms = coords(Logs);
  logger.log([ Levels.ary[4].toLowerCase() ], msg, parms);
};


Logs[Levels.ary[5].toLowerCase()] = (msg) => {
  let parms = coords(Logs);
  logger.log([ Levels.ary[5].toLowerCase() ], msg, parms);
};


export default Logs;
