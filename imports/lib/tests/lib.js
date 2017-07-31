import { forOwn } from 'lodash';

import { tests } from '../../server';
import { lib as libMethods } from '../../../imports';

const LG = console.log; // eslint-disable-line no-console,no-unused-vars

forOwn( tests(libMethods()), test => test());
