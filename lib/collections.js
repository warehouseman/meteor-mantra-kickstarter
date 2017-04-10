import { Class } from 'meteor/jagi:astronomy';
import { Mongo } from 'meteor/mongo';

import { User } from './user.js';
import { Color, _colors } from './color.js';

import { AccessControl as acl, TrustLevel as tl } from './access_control.js';

import { Lib as libWidget } from 'mmks_widget';
// import { Lib as libBook } from 'mmks_book';


export const Users = User;

export const Colors = Color;
export const _Colors = _colors;

export const AccessControl = acl;
export const TrustLevel = tl;

let { astroWidget, mongoWidget } = libWidget.new( Mongo, Class );
export const Widgets = astroWidget;
export const _Widgets = mongoWidget;

// let { astroBook, mongoBook } = libBook.new( Mongo, Class );
// export const Books = astroBook;
// export const _Books = mongoBook;

export const Posts = new Mongo.Collection('posts');
export const Comments = new Mongo.Collection('comments');
