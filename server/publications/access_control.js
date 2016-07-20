import {AccessControl} from '../../lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {

  Meteor.publish('access-points', function (_key, _group) {
    check(_key, String);
    check(_group, String);

    const selector = { key: _key, group: _group };
    const options = {};

    let ap = AccessControl.find(selector, options);
    return ap;
  });

}
