import winston from 'winston';
import mkdirp from 'mkdirp';
import touch from 'touch';
require('winston-loggly-bulk');

const targetDirectory = '/tmp/logs/meteor';
const targetFile = 'filelog-error.log';
const targetPath = `${targetDirectory}/${targetFile}`;

mkdirp.sync(targetDirectory);
touch.sync(targetPath);

const transFile = new (winston.transports.File)({
  name: 'debug-file',
  filename: targetPath,
  level: 'silly'
});

export default transFile;
