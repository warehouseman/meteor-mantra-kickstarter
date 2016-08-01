

import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import {User} from '/lib/user.js';

import mailer from './mail.js';

import _lgr from '/lib/logging/server/serverLogger';
const Lgr = new _lgr( __filename, 'verbose' );



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
      Lgr.a = '_users.add';

      const _idNew = Accounts.createUser( data );

      const hasRole = AllRoles.indexOf(data.role);
      if ( hasRole < 0 ) {
        Roles.addUsersToRoles(_idNew, AllRoles.slice( numRoles - 1 ), GROUP);
      } else {
        Roles.addUsersToRoles(_idNew, AllRoles.slice( hasRole ), GROUP);
      }

      Lgr.info('New user : ' + JSON.stringify(User.findOne(_idNew)) + '\n');
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
      Lgr.a = '_users.resetPwd' + '... ';

      const idUser = User.findOne( { 'emails.verifier': _code } );
      Lgr.info('Resetting password for, ' + idUser._id + '\n');

      Accounts.setPassword(idUser._id, _pwd);

    },

    '_users.passwordResetRequest'(_email) {
      check(_email, String);
      Lgr.a = '_users.passwordResetRequest' + '... ';

      // const user = Meteor.users.findOne({ 'emails.address': _email });
      const user = User.findOne({ 'emails.address': _email });
      if (user) {
        let verifier = randomKey();

        Lgr.info('Sending password reset request for, ' + _email +
                                    ', validated by ' + verifier + '\n');

        let idx = user.emails.findIndex(element => element.address === _email);
        user.emails[idx].verifier = verifier;
        user.save();

        mailer.resetPassword(_email, user._id, verifier);

      } else {
        Lgr.info('Bad password reset request for unrecognized : ' + _email + '\n');

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
      Lgr.a = '_users.hide' + ' ...';

      let record = User.findOne(_id);
      record.roles = { headOffice: [ '' ] };
      record.save();
      record.softRemove();

      Lgr.info('\nHidden : ' + JSON.stringify(record) + '\n');
    },

    '_users.findByEmail'(_email) {
      check(_email, String);
      Lgr.a = '_users.findByPasswordResetCode' + ' ...';

      const user = Meteor.users.findOne({ 'emails.address': _email });
      if (user) {
        Lgr.info('\nFound user : ' + JSON.stringify(user) + '\n');
        return user;
      }
      Lgr.info('\nUser not found : ' + _email + '\n');
      return null;

    },

    '_users.findByPasswordResetCode'(_code) {

      check(_code, String);
      Lgr.a = '_users.findByPasswordResetCode' + ' ...';
      const user = Meteor.users.findOne({ 'emails.address': _code });

      Lgr.info('\nHidden : ' + JSON.stringify(user) + '\n');

      return user;
    },

    '_users.removeByEmail'(_email) {

      check(_email, String);
      Meteor.users.remove({ 'emails.address': _email });
      return;
    }
  });
}
