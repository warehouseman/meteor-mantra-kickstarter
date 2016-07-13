/* eslint-disable no-console */

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import {User} from '/lib/user.js';

import mailer from './mail.js';

import Logger from '../../lib/logging';
const txtPath = Logger.path(__filename);

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
      const nameMethod = '_users.add' + ' ...';

      const _idNew = Accounts.createUser( data );

      const hasRole = AllRoles.indexOf(data.role);
      if ( hasRole < 0 ) {
        Roles.addUsersToRoles(_idNew, AllRoles.slice( numRoles - 1 ), GROUP);
      } else {
        Roles.addUsersToRoles(_idNew, AllRoles.slice( hasRole ), GROUP);
      }

      Logger.italic(nameMethod)
        .bold('New user : ' + JSON.stringify(User.findOne(_idNew)) + '\n')
        .gray(txtPath)
        .info();
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

    '_users.resetPwd'(_code, _pwd) {
      check(_code, String);
      check(_pwd, String);
      const nameMethod = '_users.resetPwd' + '... ';

      const idUser = User.findOne( { 'emails.verifier': _code } );
      Logger.italic(nameMethod)
        .bold('Resetting password for, ' + idUser._id + '\n')
        .gray(txtPath)
        .warn();

      Accounts.setPassword(idUser._id, _pwd);

    },

    '_users.passwordResetRequest'(_email) {
      check(_email, String);
      const nameMethod = '_users.passwordResetRequest' + '... ';

      // const user = Meteor.users.findOne({ 'emails.address': _email });
      const user = User.findOne({ 'emails.address': _email });
      if (user) {
        let verifier = randomKey();

        Logger.italic(nameMethod)
          .bold('Sending password reset request for, ' + _email +
                                    ', validated by ' + verifier + '\n')
          .gray(txtPath)
          .info();

        let idx = user.emails.findIndex(element => element.address === _email);
        user.emails[idx].verifier = verifier;
        user.save();

        mailer.resetPassword(_email, user._id, verifier);

      } else {
        Logger.italic(nameMethod)
          .bold('Bad password reset request for unrecognized : ' + _email + '\n')
          .gray(txtPath)
          .warn();
        throw new Meteor.Error(
          ' UNKNOWN EMAIL ',
          'We can\'t find <' + _email + '> in our files.',
          'Yup. When it\'s cwappy, it\'s wee wee, wee wee cwappy');
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

    '_users.hide'(_id) {
      check(_id, String);
      const nameMethod = '_users.hide' + ' ...';

      let record = User.findOne(_id);
      record.roles = { headOffice: [ '' ] };
      record.save();
      record.softRemove();

      Logger.italic(nameMethod)
      .bold('\nHidden : ' + JSON.stringify(record) + '\n')
      .gray(txtPath)
      .info();
    },

    '_users.findByEmail'(_email) {
      check(_email, String);
      const nameMethod = '_users.findByPasswordResetCode' + ' ...';

      const user = Meteor.users.findOne({ 'emails.address': _email });
      if (user) {
        Logger.italic(nameMethod)
          .bold('\nFound user : ' + JSON.stringify(user) + '\n')
          .gray(txtPath)
          .info();
        return user;
      }
      Logger.italic(nameMethod)
        .bold('\nUser not found : ' + _email + '\n')
        .gray(txtPath)
        .warn();
      return null;

    },

    '_users.findByPasswordResetCode'(_code) {

      check(_code, String);
      const nameMethod = '_users.findByPasswordResetCode' + ' ...';
      const user = Meteor.users.findOne({ 'emails.address': _code });

      Logger.italic(nameMethod)
        .bold('\nHidden : ' + JSON.stringify(user) + '\n')
        .gray(txtPath)
        .info();

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
