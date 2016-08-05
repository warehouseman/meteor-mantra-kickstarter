

import {Colors, _Colors, AccessControl} from '../../lib/collections';

import App from '/lib/app';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import _lgr from '/lib/logging/server/serverLogger';
const Lgr = new _lgr( __filename, 'warn' );

const module = 'colors';

export default function () {
  Meteor.methods({

    '_colors.add'(data, _id) {
      Lgr.a = '_colors.add';
      const action = 'add';
      const ap = AccessControl.findAccessPoint( module, action, App.group );

      const authorized = Roles.userIsInRole(
        Meteor.userId(),
        ap.trusted,
        ap.group
      );

      Lgr.debug( 'User, ' + Meteor.userId() + ', wants to add a color.');
      if ( authorized ) {
        check(data, {
          title: String,
          age: Number,
          content: String
        });
        check(_id, String);

        let color = new Colors();
        color._id = _id;

        color.title = data.title;
        color.content = data.content;
        color.age = data.age;

        color.createAt = new Date();

        Lgr.verbose(`\nSaving : ${JSON.stringify(color)} \n`);
        color.save();

        return;
      }

      Lgr.warn(`Unauthorized attempt to add a color by user : ${Meteor.userId()}\n`);
      throw new Meteor.Error(
        ' UNAUTHORIZED ACCESS ATTEMPT',
        'You are not authorized for that action',
        'endpoint: server/methods/_color.js');
    },

    '_colors.update'(data, _id) {
      Lgr.a = '_colors.update';
      const action = 'add';
      check(data, {
        title: String,
        age: Number,
        content: String
      });
      check(_id, String);

      const ap = AccessControl.findAccessPoint( module, action, App.group );
      const authorized = Roles.userIsInRole(
        Meteor.userId(),
        ap.trusted,
        ap.group
      );

      if ( authorized ) {
        let record = Colors.findOne(_id);
        record.fullText();

        const allowedFields = [ 'title', 'age', 'content' ];
        for (let key of allowedFields) {
          record[key] = data[key];
        }

        if ( record.content.includes('crap')) {
          throw new Meteor.Error(
            ' Remedy : cut the crap ',
            'I knew it!  It\'s YOUR fault -- again!',
            'Yup. When it\'s cwappy, it\'s wee wee, wee wee cwappy');
        }
        Lgr.verbose(`\nSaving : ${JSON.stringify(record)} \n`);
        record.save(allowedFields);

        return;
      }

      Lgr.verbose(`Unauthorized attempt to edit color by user : ${Meteor.userId()}\n`);
      throw new Meteor.Error(
        ' UNAUTHORIZED ACCESS ATTEMPT',
        'You are not authorized for that action',
        'endpoint: server/methods/_color.js');

    },

    '_colors.delete'(_id) {
      check(_id, String);
      Lgr.a = '_colors.delete';

      Lgr.info(`\nDeleting : ${JSON.stringify(record)}\n`);

      let record = Colors.findOne(_id);
      record.remove();
    },

    '_colors.hide'(_id) {
      check(_id, String);
      Lgr.a = '_colors.hide';

      let record = Colors.findOne(_id);
      record.softRemove();

      Lgr.info(`\nHidden : ${JSON.stringify(record)}\n`);

    },

    '_colors.wipe'() {
      let result = _Colors.remove({});
      return result;
    }
  });
}
