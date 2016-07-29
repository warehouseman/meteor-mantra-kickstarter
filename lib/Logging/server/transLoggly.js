import winston from 'winston';
require('winston-loggly-bulk');

const transLoggly = new (winston.transports.Loggly)({
  subdomain: Meteor.settings.LOGGLY_SUBDOMAIN,
  token: Meteor.settings.LOGGLY_TOKEN,
  tags: [ 'Winston-NodeJS' ],
  json: true,
  level: 'silly'
});


export default transLoggly;
