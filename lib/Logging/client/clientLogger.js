import { Levels } from '../winston_levels';
import logatim from 'logatim';
import LoggerUtils from '../utilsLogging';

logatim.setLevel('trace');

const coords = LoggerUtils.coords;

class Logger {

  constructor( f, l, c ) {
    this.f = f;
    this.l = l;
    this.c = c;
  }


  error(msg) {

    let parms = coords(this);
    parms.ip = Logger.myIp;
    if ( Levels.levels[this.l] >= 0) {
      if ( this.c ) {
        logatim.red.underline(parms.action).red(` - ${msg}`)
                                    .grey(`  º (in file : ${parms.file} )`).error();
      }
      Meteor.call(Levels.ary[0], msg, parms, function () {});
    }
  }

  warn(msg) {

    let parms = coords(this);
    parms.ip = Logger.myIp;
    if ( Levels.levels[this.l] >= 1) {
      if ( this.c ) {
        logatim.magenta.underline(parms.action).magenta(` - ${msg}`)
                                    .grey(`  º (in file : ${parms.file} )`).warn();
      }
      Meteor.call(Levels.ary[1], msg, parms, function () {});
    }
  }

  info(msg) {

    let parms = coords(this);
    parms.ip = Logger.myIp;
    if ( Levels.levels[this.l] >= 2) {
      if ( this.c ) {
        logatim.green.underline(parms.action).green(` - ${msg}`)
                                    .grey(`  º (in file : ${parms.file} )`).info();
      }
      Meteor.call(Levels.ary[2], msg, parms, function () {});
    }
  }

  verbose(msg) {

    let parms = coords(this);
    parms.ip = Logger.myIp;
    if ( Levels.levels[this.l] >= 3) {
      if ( this.c ) {
        logatim.yellow.underline(parms.action).yellow(` - ${msg}`)
                                    .grey(`  º (in file : ${parms.file} )`).debug();
      }
      Meteor.call(Levels.ary[3], msg, parms, function () {});
    }
  }

  debug(msg) {

    let parms = coords(this);
    parms.ip = Logger.myIp;
    if ( Levels.levels[this.l] >= 4) {
      if ( this.c ) {
        logatim.cyan.underline(parms.action).cyan(` - ${msg}`)
                                    .grey(`  º (in file : ${parms.file} )`).debug();
      }
      Meteor.call(Levels.ary[4], msg, parms, function () {});
    }
  }

  silly(msg) {

    let parms = coords(this);
    parms.ip = Logger.myIp;
    if ( Levels.levels[this.l] >= 5) {
      if ( this.c ) {
        logatim.grey.underline(parms.action).grey(` - ${msg}`)
                                    .grey(`  º (in file : ${parms.file} )`).trace();
      }
      Meteor.call(Levels.ary[5], msg, parms, function () {});
    }
  }
}

/* eslint-disable no-console */
Meteor.startup(function () {
  Meteor.call('getIP', function (error, result) {
    if ( error ) {
      console.log(' * * * Failed trying to get client Ip address * * * ');
    } else {
      Logger.myIp = result;
    }
  });
});
/* eslint-enable no-console */

export default Logger;
