import { forOwn } from 'lodash';

import { lib as libMethods } from '../imports';
import lib from '../imports/lib';
import { client as clientMethods } from '../imports';
import client from '../imports/client';

// const LG = console.log; // eslint-disable-line no-console, no-unused-vars
// LG(' lib ', lib);
// LG(' libMethods ', libMethods);

forOwn( client.tests(clientMethods()), test => test());
client.tests(clientMethods());

forOwn( lib.tests(libMethods()), test => test());
lib.tests(libMethods());
