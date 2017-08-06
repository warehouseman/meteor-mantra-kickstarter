import { forOwn } from 'lodash';

import { lib as libMethods } from '../imports';
import lib from '../imports/lib';
import { server as serverMethods } from '../imports';
import server from '../imports/server';

// const LG = console.log; // eslint-disable-line no-console, no-unused-vars
// LG(' lib ', lib);
// LG(' libMethods ', libMethods);

forOwn( server.tests(serverMethods()), test => test());
server.tests(serverMethods());

forOwn( lib.tests(libMethods()), test => test());
lib.tests(libMethods());
