import SimpleSchema from 'simpl-schema';

const UserCountry = new SimpleSchema({
  name: {
    type: String
  },
  code: {
    type: String,
    regEx: /^[A-Z]{2}$/
  }
});

const UserProfile = new SimpleSchema({
  firstName: {
    label: 'Name',
    type: String,
    optional: true
  },
  lastName: {
    label: 'Family Name',
    type: String,
    optional: true
  },
  birthday: {
    type: Date,
    optional: true
  },
  gender: {
    type: String,
    allowedValues: [ 'Male', 'Female' ],
    optional: true
  },
  organization: {
    type: String,
    optional: true
  },
  website: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  },
  bio: {
    type: String,
    optional: true
  },
  country: {
    type: UserCountry,
    optional: true
  }
});

// export const User = new SimpleSchema({
//   firstName: {type: String, optional: false, label: 'Name'},
//   lastName: {type: String, optional: false, label: 'Family Name'},
//   email: {type: String, optional: false, label: 'Number of Pages'},
//   role: {type: String, optional: false, label: 'Privilege Level'}
// });

export const User = new SimpleSchema({
  username: {
    type: String,
    // For accounts-password, either emails or username is required, but not both. It is OK to make this
    // optional here because the accounts-password package does its own validation.
    // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    optional: true
  },
  emails: {
    type: Array,
    // For accounts-password, either emails or username is required, but not both. It is OK to make this
    // optional here because the accounts-password package does its own validation.
    // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    optional: true
  },
  'emails.$': {
    type: Object
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  'emails.$.verified': {
    type: Boolean
  },
  registered_emails: { // eslint-disable-line camelcase
    type: Array,
    optional: true
  },
  're1gistered_emails.$': {
    type: Object,
    blackbox: true
  },
  createdAt: {
    type: Date
  },
  profile: {
    type: UserProfile,
    optional: true
  },
  // Make sure this services field is in your schema if you're using any of the accounts packages
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  roles: {
    label: 'Privilege Level',
    type: Object,
    blackbox: true,
    optional: true
  },
  // 'roles.$': {
  //   type: Object
  // },
  // 'roles.$.headOffice': {
  //   type: Array
  // },
  // In order to avoid an 'Exception in setInterval callback' from Meteor
  heartbeat: {
    type: Date,
    optional: true
  }
});
