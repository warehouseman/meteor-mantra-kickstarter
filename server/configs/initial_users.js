import {Meteor} from 'meteor/meteor';

export default () => {
  if (Meteor.users.find().count() < 6 ) {

    console.log('>>>>>>>>>>>>>>>>>>');

    const AllRoles = [ 'Owner', 'Administrator', 'Staff', 'Member', 'Customer', 'Registered' ];
    let idx = 0;

    var users = [
      {
        firstName: 'Leonardo',
        lastName: 'Wild',
        email: 'owner@example.com',
        roles: AllRoles.slice(idx++)
      },
      {
        firstName: 'Hasan',
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
        lastName: 'Subía',
        email: 'registered@example.com',
        roles: AllRoles.slice(idx++)
      }
    ];

    _.each(users, function (user) {
      var id;

      id = Accounts.createUser({
        email: user.email,
        password: 'apple1',
        profile: { firstName: user.firstName, lastName: user.lastName }
      });

      console.log('Roles : ', user.roles);

      if (user.roles.length > 0) {
        // Need _id of existing user record so this call must come
        // after `Accounts.createUser` or `Accounts.onCreate`
        Roles.addUsersToRoles(id, user.roles, 'default-group');
      }

    });

    console.log('<<<<<<<<<<<<<<<<<<<');



  }
};
