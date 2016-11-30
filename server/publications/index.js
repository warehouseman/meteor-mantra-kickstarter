/* eslint-disable no-console   */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import posts from './posts';
import _users from './_users';
import _colors from './_colors';

import _roles from './_roles';
import accessControl from './access_control';

import { Widgets } from '../../lib/collections';
import { Publications as pubsWidget } from 'mmks_widget';

let _widgets = pubsWidget.new( Widgets, Meteor, check );

export default function () {
  posts();
  _users();
  _colors();
  _widgets();
  _roles();
  accessControl();
}
