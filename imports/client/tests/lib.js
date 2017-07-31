import { forOwn } from 'lodash';

import { tests } from '../../client';
import { client as clientMethods } from '../../../imports';

const LG = console.log; // eslint-disable-line no-console,no-unused-vars

forOwn( tests(clientMethods()), test => test());
