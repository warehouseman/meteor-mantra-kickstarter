import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
// import { check, Match } from 'meteor/check';
import Logger from './winston.js';

let ipRemote = null;
Meteor.onConnection(function (conn) {
//  console.log(' IP ', conn.clientAddress);
  ipRemote = conn.clientAddress;
});


const logger = new Logger();

Meteor.methods({
  getIP: () => {
    return ipRemote;
  },
  Silly: (msg, params) => {
    check( msg, String );
    check( params, Object );

    logger.log('silly', msg, params);
  },

  Debug: (msg, params) => {
    check( msg, String );
    check( params, Object );

    logger.log('debug', msg, params);
  },

  Verbose: (msg, params) => {
    check( msg, String );
    check( params, Object );

    logger.log('verbose', msg, params);
  },

  Info: (msg, params) => {
    check( msg, String );
    check( params, Object );

    logger.log('info', msg, params);
  },

  Warn: (msg, params) => {
    check( msg, String );
    check( params, Object );

    logger.log('warn', msg, params);
  },

  Error: (msg, params) => {
    check( msg, String );
    check( params, Object );

    logger.log('error', msg, params);
  }

});
