/* eslint-disable no-console */

import {Colors, _Colors} from '../../lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import Logger from '../../lib/logging';
const txtPath = Logger.path(__filename);


// import _ from 'lodash';
export default function () {
  Meteor.methods({

    '_colors.add'(data, _id) {
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
    },

    '_colors.update'(data, _id) {
      check(data, {
        title: String,
        age: Number,
        content: String
      });
      check(_id, String);

      const nameMethod = '_colors.update';

      let record = Colors.findOne(_id);
      record.fullText();

      const allowedFields = [ 'title', 'age', 'content' ];
      for (let key of allowedFields) {
        record[key] = data[key];
      }
      Logger.italic(nameMethod)
        .bold('\nSaving : ' + JSON.stringify(record) + '\n')
        .gray(txtPath)
        .info();

      if ( record.content.includes('crap')) {
        throw new Meteor.Error(
          ' Remedy : cut the crap ',
          'I knew it!  It\'s YOUR fault -- again!',
          'Yup. When it\'s cwappy, it\'s wee wee, wee wee cwappy');
      }
      record.save(allowedFields);

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
