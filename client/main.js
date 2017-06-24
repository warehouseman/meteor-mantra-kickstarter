import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import commentsModule from './modules/comments';

import _usersModule from './modules/_users';
import _colorsModule from './modules/_colors';

import Logger from '/lib/logging/client/clientLogger';
import { LayoutDefault } from './configs/theme.jsx';
import AccessControlComposer from './access_control/acComposer';
import Authorized from './access_control/acContainer.js';
import UserComposer from '/client/modules/_users/composers/account/auth.jsx';


/* eslint-disable no-console   */
const context = initContext();


// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(commentsModule);
app.loadModule(_usersModule);
app.loadModule(_colorsModule);

import { Client as _widget } from 'mmks_widget';
let Widget = _widget.new({
  Logger,
  LayoutDefault,
  AccessControlComposer,
  Authorized
});
app.loadModule(Widget);

import { Client as _book } from 'mmks_book';
let Book = _book.new({
  Logger,
  LayoutDefault,
  AccessControlComposer,
  Authorized
});
app.loadModule(Book);

function requireLayout(isModule) {
  console.log( '******* main:isModule? ', isModule );  // eslint-disable-line no-console

  if ( isModule.toLowerCase() === 'true' || isModule.toLowerCase() === 'yes' ) {
    const _layout = require('mmks_layout').Client;
    let layout = _layout.new({
      Logger,
      Context: context,
    //  LayoutDefault,
      UserComposer,
      AccessControlComposer,
      Authorized
    });
    return layout;
  }
  return require('./modules/layout');
}

const _layoutModule = requireLayout(Meteor.settings.public.IS_GITSUBMODULE);
app.loadModule(_layoutModule);


app.init();
console.log('App initialized');  // eslint-disable-line no-console
