import winston from 'winston';
require('winston-loggly-bulk');

const transLoggly = new (winston.transports.Loggly)({
  subdomain: Meteor.settings.LOGGLY_SUBDOMAIN,
  token: process.env.LOGGLY_TOKEN || Meteor.settings.LOGGLY_TOKEN,
  tags: [ 'Winston-NodeJS' ],
  json: true,
  level: 'silly'
});


export default transLoggly;
