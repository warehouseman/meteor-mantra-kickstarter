/* eslint-disable no-console */

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import {User} from '/lib/user.js';

import mailer from './mail.js';

// import _ from 'lodash';

const AllRoles = [ 'Owner', 'Administrator', 'Staff', 'Member', 'Customer', 'Registered' ];
const numRoles = AllRoles.length;

const GROUP = 'headOffice';

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomKey() {
  return getRandomIntInclusive(1048576,116777215).toString(16);
}


export default function () {
  Meteor.methods({

    '_users.add'(data) {

      check(data, {
        email: String,
        profile: {
          firstName: String,
          lastName: String
        },
        password: String,
        role: String
      });

      const _idNew = Accounts.createUser( data );

      const hasRole = AllRoles.indexOf(data.role);
      if ( hasRole < 0 ) {
        Roles.addUsersToRoles(_idNew, AllRoles.slice( numRoles - 1 ), GROUP);
      } else {
        Roles.addUsersToRoles(_idNew, AllRoles.slice( hasRole ), GROUP);
      }

      return { _idNew };

    },

    '_users.update'(data, _id) {
      check(data, {
        firstName: String,
        lastName: String,
        email: String,
        role: String
      });
      check(_id, String);


      let record = User.findOne(_id);

      record.profile.firstName = data.firstName;
      record.profile.lastName = data.lastName;
      record.emails[0].address = data.email;

      record.save();

      Roles.setUserRoles(_id, AllRoles.slice(AllRoles.indexOf(data.role)), 'headOffice');

    },

    '_users.passwordResetRequest'(_email) {
      check(_email, String);
      const user = Meteor.users.findOne({ 'emails.address': _email });
      if (user) {
        let validator = randomKey();
        console.log( 'Sending password reset request for ' + _email + ' validated by ' + validator);
        mailer.resetPassword(_email, user._id, validator);

      } else {
        console.log( 'Unknown user' );
        return;
      }
    },

    '_users.delete'(_id) {
      check(_id, String);
      //  console.log('_users.delete _id', _id);
      if (Meteor.userId() !== _id) {
        let record = Meteor.users.findOne(_id);
        record.remove();
      }
    },

    '_users.findByEmail'(_email) {

      check(_email, String);
      const user = Meteor.users.findOne({ 'emails.address': _email });
      // console.log('_users.findByEmail(' + _email + ') --> User found : ', user);
      return user;
    },

    '_users.removeByEmail'(_email) {

      check(_email, String);
      Meteor.users.remove({ 'emails.address': _email });
      // console.log('_users.removeByEmail(' + _email + ') --> User deleted. ');
      return;
    }
  });
}

/*

{
    "_id": "W6NbBRXoJ3PYeTJeu",
    "createdAt" : ISODate("2016-07-03T10:02:47.508Z"),
    "services": {
        "password": {
            "bcrypt": "$2a$10$26caqcdhBll5cgC/f8ZdbuLckO78Ze5bcGPJxtjJPJCV04/3OgK1C"
        }
    },
    "emails": [
        {
            "address": "registered@example.com",
            "verified": false
        }
    ],
    "profile": {
        "firstName": "Alejandro",
        "lastName": "Vasquez",
        "pr": 0
    },
    "roles": {
        "headOffice": [
            "Registered"
        ]
    }
}
*/
