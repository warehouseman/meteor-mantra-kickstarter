import {_roles} from '../../lib/collections';
import {Meteor} from 'meteor/meteor';

export default function () {
  Meteor.publish('roles', function () {
    const selector = {};
    const options = {};

    return _roles.find(selector, options);
  });

}
