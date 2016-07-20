/* eslint-disable no-console */

import {Colors, _Colors, AccessControl} from '../../lib/collections';

import App from '/lib/app';

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import Logger from '../../lib/logging';
const txtPath = Logger.path(__filename);

export default function () {
  Meteor.methods({

    '_colors.add'(data, _id) {
      const nameMethod = '_colors.add';

      const ap = AccessControl.findAccessPoint( 'colors.add', App.group );
      const authorized = Roles.userIsInRole(Meteor.userId(), ap.trusted, ap.group);

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

        color.save();

        return;
      }

      Logger.italic(nameMethod)
        .bold('Unauthorized attempt to add a color by user : ' + Meteor.userId() + '\n')
        .gray(txtPath)
        .warn();
      throw new Meteor.Error(
        ' UNAUTHORIZED ACCESS ATTEMPT',
        'You are not authorized for that action',
        'endpoint: server/methods/_color.js');
    },

    '_colors.update'(data, _id) {
      const nameMethod = '_colors.update';
      check(data, {
        title: String,
        age: Number,
        content: String
      });
      check(_id, String);

      const ap = AccessControl.findAccessPoint( 'colors.update', App.group );
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
        record.save(allowedFields);

        Logger.italic(nameMethod)
          .bold('\nSaving : ' + JSON.stringify(record) + '\n')
          .gray(txtPath)
          .info();
        return;
      }

      Logger.italic(nameMethod)
        .bold('Unauthorized attempt to edit color by user : ' + Meteor.userId() + '\n')
        .gray(txtPath)
        .warn();
      throw new Meteor.Error(
        ' UNAUTHORIZED ACCESS ATTEMPT',
        'You are not authorized for that action',
        'endpoint: server/methods/_color.js');

    },

    '_colors.delete'(_id) {
      check(_id, String);
      const nameMethod = '_colors.delete';

      Logger.italic(nameMethod)
        .bold('\nDeleting : ' + JSON.stringify(record) + '\n')
        .gray(txtPath)
        .info();

      let record = Colors.findOne(_id);
      record.remove();
    },

    '_colors.hide'(_id) {
      check(_id, String);
      const nameMethod = '_colors.hide';

      let record = Colors.findOne(_id);
      record.softRemove();

      Logger.italic(nameMethod)
        .bold('\nHidden : ' + JSON.stringify(record) + '\n')
        .gray(txtPath)
        .info();

    },

    '_colors.wipe'() {
      let result = _Colors.remove({});
      return result;
    }
  });
}
