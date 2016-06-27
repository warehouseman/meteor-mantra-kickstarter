// Meteor.users.deny ({
//   insert: (userId, doc, fields, modifier) => true,
//   update: (userId, doc, fields, modifier) => true,
//   remove: (userId, doc, fields, modifier) => true,
// })

import _ from 'lodash';

export const Phone = Astro.Class({
  name: 'Phone',
  fields: {
    name: {
      type: 'string',
      validator: [
        Validators.minLength(3)
      ]
    },
    number: {
      type: 'string',
      validator: [
        Validators.minLength(9)
      ]
    },
    uuid: {
      type: 'string',
    },
  }
});

export const Email = Astro.Class({
  name: 'Email',
  fields: {
    address: {
      type: 'string',
      // validator: [
      //   Validators.minLength(3)
      // ]
    },
    verified: {
      type: 'string',
      // validator: [
      //   Validators.minLength(9)
      // ]
    }
  }
});

export const Roles = Astro.Class({
  name: 'Roles',
  fields: {
    headOffice: {
      type: 'array'
    }
  }
});

export const UserProfile = Astro.Class({
  name: 'UserProfile',
  fields: {
    /* Any fields you want to be published to the client */
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    phones: {
      type: 'array',
      nested: 'Phone',
      default() {
        return [];
      }
    },
    // nickname
  }
});



const User = Astro.Class({
  name: 'User',
  collection: Meteor.users,
  fields: {

    emails: {
      type: 'array',
      nested: 'Email',
      default() {
        return [];
      }
    },

    createdAt: 'date',

    profile: {
      type: 'object',
      nested: 'UserProfile',
      default() {
        return {};
      }
    },

    roles: {
      type: 'object',
      nested: 'Roles',
      default() {
        return {};
      }
    },

    _iss: {
      type: 'boolean'
    },

    _isa: {
      type: 'boolean'
    }

  },
  methods: {
    firstEmail() {
      return _.get(this, 'emails[0].address', null);
    },
    bestRole() {
      return _.get(this, 'roles.headOffice[0]', null);
    }
    // ,aclIs (roleSlug) {
    //   // console.log ('UUser->aclIsInRole role-slug', roleSlug);
    //   // console.log(this.roles)
    //   return _.contains(this.roles, roleSlug);
    // }
  },
});

if (Meteor.isServer) {
  User.extend({
    fields: {
      services: 'object'
    }
  });
}

export default User;
