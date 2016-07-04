/* eslint-disable no-console */

import {Colors, _Colors} from '../../lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

// import _ from 'lodash';
export default function () {
  Meteor.methods({

    '_colors.add'(data, _id) {
      check(data, {
        title: String,
        content: String
      });
      check(_id, String);

      let color = new Colors();
      color._id = _id;

      color.title = data.title;
      color.content = data.content;

      color.createAt = new Date();

      color.save();
    },

    '_colors.update'(data, _id) {
      check(data, {
        title: String,
        content: String
      });
      check(_id, String);

      let record = Colors.findOne(_id);
      record.fullText();

      const allowedFields = [ 'title','content' ];
      for (let key of allowedFields) {
        record[key] = data[key];
      }
      record.save(allowedFields);


    },

    '_colors.delete'(_id) {
      check(_id, String);
      //  console.log('_colors.delete _id', _id);
      let record = Colors.findOne(_id);
      record.remove();
    },

    '_colors.hide'(_id) {
      check(_id, String);
      let record = Colors.findOne(_id);
      record.softRemove();
    },

    '_colors.wipe'() {
      let result = _Colors.remove({});
      return result;
    }
  });
}
