import {Meteor} from 'meteor/meteor';
import {AccessControl} from '../../lib/collections';

const AllRoles = AccessControl.getTrustLevels();

export const Groups = {
  defaultGroup: 'headOffice',
  subsidiaryGroup: 'branch'
};

export default () => {
  if (Meteor.users.find().count() < 6 ) {

    let idx = 0;

    var users = [
      {
        firstName: 'Leonardo',
        lastName: 'Wild',
        email: 'owner@example.com',
        roles: AllRoles.slice(idx++)
      },
      {
        firstName: 'Martin',
        lastName: 'Bramwell',
        email: 'administrator@example.com',
        roles: AllRoles.slice(idx++)
      },
      {
        firstName: 'Segundo',
        lastName: 'Moreno',
        email: 'staff@example.com',
        roles: AllRoles.slice(idx++)
      },
      {
        firstName: 'Oscar',
        lastName: 'Dávila',
        email: 'member@example.com',
        roles: AllRoles.slice(idx++)
      },
      {
        firstName: 'Abner',
        lastName: 'Galarza',
        email: 'customer@example.com',
        roles: AllRoles.slice(idx++)
      },
      {
        firstName: 'Alejandro',
        lastName: 'Vasquez',
        email: 'registered@example.com',
        roles: AllRoles.slice(idx++)
      }
    ];

    _.each(users, function (user) {
      var id;

      id = Accounts.createUser({
        email: user.email,
        password: 'apple_01',
        profile: { firstName: user.firstName, lastName: user.lastName }
      });

      if (user.roles.length > 0) {
        // Need _id of existing user record so this call must come
        // after `Accounts.createUser` or `Accounts.onCreate`
        Roles.addUsersToRoles(id, user.roles, 'headOffice');
      }

    });

  }
};
