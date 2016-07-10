/* eslint-disable no-console */

import {Colors, _Colors} from '../../lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Logger from '../../lib/logging';


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

      let record = Colors.findOne(_id);
      record.fullText();

      const allowedFields = [ 'title', 'age', 'content' ];
      for (let key of allowedFields) {
        record[key] = data[key];
      }
      Logger.italic('_colors.update')
        .bold('\nSaving : ' + JSON.stringify(record) + '\n')
        .gray(Logger.path(__filename))
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
      //  console.log('_colors.delete _id', _id);
      Logger.italic('_colors.delete')
        .bold('\nDeleting : ' + JSON.stringify(record) + '\n')
        .gray(Logger.path(__filename))
        .info();

      let record = Colors.findOne(_id);
      record.remove();
    },

    '_colors.hide'(_id) {
      check(_id, String);
      let record = Colors.findOne(_id);
      record.softRemove();

      Logger.italic('_colors.hide')
        .bold('\nHidden : ' + JSON.stringify(record) + '\n')
        .gray(Logger.path(__filename))
        .info();

    },

    '_colors.wipe'() {
      let result = _Colors.remove({});
      return result;
    }
  });
}
