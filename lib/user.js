import { Class } from 'meteor/jagi:astronomy';

import _ from 'lodash';

export const Phone = Class.create({
  name: 'Phone',
  fields: {
    name: {
      type: String,
      validator: [ { type: 'minLength', param: 3 } ]
    },
    number: {
      type: String,
      validator: [ { type: 'minLength', param: 9 } ]
    },
    uuid: {
      type: String,
    },
  }
});

export const Email = Class.create({
  name: 'Email',
  fields: {
    address: {
      type: String,
    },
    verified: {
      type: Boolean,
      optional: false,
      default: false,
    },
    verifier: {
      type: String,
      optional: true,
    }
  }
});

export const UserProfile = Class.create({
  name: 'UserProfile',
  fields: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phones: {
      type: [ Phone ],
      optional: true,
    },
  }
});

export const Roles = Class.create({
  name: 'Roles',
  fields: {
    headOffice: {
      type: [ String ],
      default: function roles() {
        return [];
      }
    }
  }
});

export const User = Class.create({
  name: 'User',
  collection: Meteor.users,
  fields: {

    createdAt: Date,

    emails: [ Email ],
    profile: {
      type: UserProfile,
      optional: true,
    },
    roles: {
      type: Roles,
      optional: true,
    },
  },
  methods: {
    addEmail(_email) {
      let email = { address: _email, verified: false };
      this.emails.push(email);
    },
    firstEmail() {
      return _.get(this, 'emails[0].address', null);
    },
    bestRole() {
      return _.get(this, 'roles.headOffice[0]', null);
    }
  },
  behaviors: {
    softremove: {
      removedFieldName: 'removed',
      hasRemovedAtField: true,
      removedAtFieldName: 'removedAt'
    },
    timestamp: {
      hasCreatedField: true,
      createdFieldName: 'createdAt',
      hasUpdatedField: true,
      updatedFieldName: 'updatedAt'
    }
  },
});

if (Meteor.isServer) {
  User.extend({
    fields: {
      services: {
        type: Object,
        optional: true,
      },
    }
  });
}
