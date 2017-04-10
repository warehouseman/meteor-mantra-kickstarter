require('babel-core/register');
require('babel-polyfill');

process.on('unhandledRejection', function (error) {
/* eslint-disable no-console */
  console.error('Unhandled Promise Rejection:');
  console.error(error && error.stack || error);
/* eslint-enable no-console */
});
