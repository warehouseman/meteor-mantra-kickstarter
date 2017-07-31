import { forOwn } from 'lodash';

import { tests } from '../../server';
import { server as serverMethods } from '../../../imports';

const LG = console.log; // eslint-disable-line no-console,no-unused-vars

forOwn( tests(serverMethods()), test => test());
