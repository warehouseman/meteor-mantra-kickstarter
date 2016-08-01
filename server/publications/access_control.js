import {AccessControl} from '../../lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {

  Meteor.publish('access-points', function (_module, _group) {
    check(_module, String);
    check(_group, String);

    const selector = { module: _module, group: _group };
    const options = {};

    let ap = AccessControl.find(selector, options);
    return ap;
  });

}
