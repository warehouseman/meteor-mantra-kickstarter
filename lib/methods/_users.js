import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { AccessControl } from '/lib/access_control.js';
import { UserSchema as User } from '/lib/user.js';

const mailer = Meteor.isServer ? require('/server/methods/mail.js').default : null;

const _lgr = Meteor.isServer ?
  require('/lib/logging/server/serverLogger').default :
  require('/lib/logging/client/clientLogger').default;

const Lgr = new _lgr( __filename, 'debug' );

const AllRoles = AccessControl.getTrustLevels();
const numRoles = AllRoles.length;

const GROUP = 'headOffice';

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomKey() {
  return getRandomIntInclusive(1048576,116777215).toString(16);
}

export const usersUpdate = new ValidatedMethod({
  name: '_users.update',
  validate: User.validator(),
  run( data ) {

    let id = data._id;
    delete data._id;

    Meteor.users.update( id, {$set: data} );
    Roles.addUsersToRoles( id, data.roles[GROUP], GROUP );
  }
});

export const usersAdd = new ValidatedMethod({
  name: '_users.add',
  validate: User.validator(),
  run( data ) {
    Lgr.a = '_users.add';
    Lgr.info(' >>> New user (full) : ' + JSON.stringify(data) + '\n');

    const newUser = {
      username: '',
      email: data.emails[0].address,
      password: data.password,
      confirmPassword: data.password,
      profile: data.profile
    };

    Lgr.info(' >>> New user : ' + JSON.stringify( newUser ) + '\n');

    const _idNew = Accounts.createUser( newUser );
    Lgr.info('New user created.' + '\n');

    if ( Meteor.isServer ) {
      if ( data.roles && data.roles[GROUP] && data.roles[GROUP].length > 0 ) {
        Lgr.info('New user\'s roles : %s\n', data.roles[GROUP]);
        Roles.addUsersToRoles(_idNew, data.roles[GROUP], GROUP);
      } else {
        Roles.addUsersToRoles(_idNew, AllRoles.slice( numRoles - 1 ), GROUP);
      }
    }

    Lgr.info('New user : ' + JSON.stringify(Meteor.users.findOne(_idNew)) + '\n');
    return { _idNew };
  }
});


export default function () {
  Meteor.methods({

    '_users.resetPwd'(_code, _pwd) {
      Lgr.a = '_users.resetPwd' + '... ';

      const idUser = Meteor.users.findOne( { 'emails.verifier': _code } );
      Lgr.info('Resetting password for, ' + idUser._id + '\n');

      Accounts.setPassword(idUser._id, _pwd);

    },

    '_users.passwordResetRequest'(_email) {
      Lgr.a = '_users.passwordResetRequest' + '... ';

      if ( Meteor.isServer ) {
        const user = Meteor.users.findOne({ 'emails.address': _email });
        if (user) {
          let verifier = randomKey();

          Lgr.info('Sending password reset request for, ' + _email +
                                      ', validated by ' + verifier + ' (' + typeof verifier + ')\n');

          let idx = user.emails.findIndex(element => element.address === _email);
          user.emails[idx].verifier = verifier;
          Meteor.users.update(user._id, {$set: user});

          mailer.resetPassword(_email, user._id, verifier);

        } else {
          Lgr.info('Bad password reset request for unrecognized : ' + _email + '\n');

          throw new Meteor.Error(
            ' UNKNOWN EMAIL ',
            'We can\'t find <' + _email + '> in our files.',
            'Yup. When it\'s cwappy, it\'s wee wee, wee wee cwappy');
        }
      }
    },

    '_users.delete'(_id) {
      if (Meteor.userId() !== _id) {
        let record = Meteor.users.findOne(_id);
        record.remove();
      }
    },

    '_users.hide'(_id) {
      Lgr.a = '_users.hide' + ' ...';

      let record = Meteor.users.findOne(_id);
      record.roles = { headOffice: [] };
      Meteor.users.update(record._id, {$set: record});

      Lgr.info('\nHidden : ' + JSON.stringify(record) + '\n');
    },

    '_users.findByEmail'(_email) {
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

      Lgr.a = '_users.findByPasswordResetCode' + ' ...';
      const user = Meteor.users.findOne({ 'emails.address': _code });

      Lgr.info('\nHidden : ' + JSON.stringify(user) + '\n');

      return user;
    },

    '_users.removeByEmail'(_email) {

      Meteor.users.remove({ 'emails.address': _email });
      return;
    }
  });
}
