import {Mongo} from 'meteor/mongo';
import {User} from './user.js';
import {Color, _colors} from './color.js';

export const Posts = new Mongo.Collection('posts');
export const Comments = new Mongo.Collection('comments');

export const Users = User;

export const Colors = Color;
export const _Colors = _colors;

