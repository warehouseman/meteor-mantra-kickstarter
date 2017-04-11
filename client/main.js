import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import commentsModule from './modules/comments';

import _usersModule from './modules/_users';
import _colorsModule from './modules/_colors';

import _layoutModule from './modules/layout';

import Logger from '/lib/logging/client/clientLogger';
import { LayoutDefault } from './configs/theme.jsx';
import AccessControlComposer from './access_control/acComposer';
import Authorized from './access_control/acContainer.js';

import { Client as _widget } from 'mmks_widget';
import { Client as _book } from 'mmks_book';


/* eslint-disable no-console   */
// init context
const context = initContext();


// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(commentsModule);
app.loadModule(_usersModule);
app.loadModule(_colorsModule);
app.loadModule(_layoutModule);

let Widget = _widget.new({
  Logger,
  LayoutDefault,
  AccessControlComposer,
  Authorized
});
app.loadModule(Widget);

let Book = _book.new({
  Logger,
  LayoutDefault,
  AccessControlComposer,
  Authorized
});
app.loadModule(Book);

app.init();
console.log('App initialized');
