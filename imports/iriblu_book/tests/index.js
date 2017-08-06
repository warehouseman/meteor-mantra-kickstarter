import { merge, forOwn } from 'lodash';

import client from '../client';
import lib from '../lib';
import server from '../server';

forOwn( merge(client.tests(), lib.tests(), server.tests()), test => test());
