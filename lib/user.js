import SimpleSchema from 'simpl-schema';
import { AccessControl } from '/lib/access_control';

const enumRoles = AccessControl.getTrustLevels();

SimpleSchema.setDefaultMessages({
  messages: {
    en: {
      matchPasswords: 'The two password fields must match.',
    },
  },
});

const HeadOfficeRoles = new SimpleSchema({
  headOffice: {
    type: Array,
    optional: false,
  },

  'headOffice.$': {
    type: Object,
  },
  'headOffice.$.privilege': {
    type: String,
    label: 'Privilege',
  }

});

const UserCountry = new SimpleSchema({
  name: {
    type: String,
  },
  code: {
    type: String,
    regEx: /^[A-Z]{2}$/,
  }
});

const UserProfile = new SimpleSchema({
  firstName: {
    label: 'Name',
    type: String,
    optional: false,
  },
  lastName: {
    label: 'Family Name',
    type: String,
    optional: false,
  },
  birthday: {
    type: Date,
    optional: true,
  },
  gender: {
    type: String,
    allowedValues: [ 'Male', 'Female' ],
    optional: true,
  },
  organization: {
    type: String,
    optional: true,
  },
  website: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true,
  },
  bio: {
    type: String,
    optional: true,
  },
  country: {
    type: UserCountry,
    optional: true,
  }
});

const UserSchema = new SimpleSchema({
  _id: {
    type: String,
    optional: true,
  },
  username: {
    type: String,
    // For accounts-password, either emails or username is required, but not both. It is OK to make this
    // optional here because the accounts-password package does its own validation.
    // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    optional: true,
  },
  password: {
    type: String,
    optional: true,
  },
  emails: {
    type: Array,
    // For accounts-password, either emails or username is required, but not both. It is OK to make this
    // optional here because the accounts-password package does its own validation.
    // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    optional: false,
  },
  'emails.$': {
    type: Object,
  },
  'emails.$.address': {
    type: String,
    label: 'EMail Address',
    regEx: SimpleSchema.RegEx.Email,
  },
  'emails.$.verified': {
    type: Boolean,
    optional: true,
  },
  'emails.$.verifier': {
    type: String,
    optional: true,
  },
  registered_emails: { // eslint-disable-line camelcase
    type: Array,
    optional: true,
  },
  'registered_emails.$': {
    type: Object,
    blackbox: true,
  },
  createdAt: {
    type: Date,
  },
  profile: {
    type: UserProfile,
    optional: true,
  },
  // Make sure this services field is in your schema if you're using any of the accounts packages
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  roles: {
    label: 'Privilege Level',
    // type: Object,
    blackbox: true,
    type: HeadOfficeRoles,
    optional: true,
  },
  // In order to avoid an 'Exception in setInterval callback' from Meteor
  heartbeat: {
    type: Date,
    optional: true,
  }
});

const PwdSchema = new SimpleSchema({
  password: {
    type: String,
    optional: false,
    label: 'Your choice of password',
    min: 2, // *** FIXME ***
  },
  confirmPassword: {
    type: String,
    optional: false,
    label: 'Repeat the password to confirm',
    min: 2, // *** FIXME ***
    /* eslint-disable object-shorthand */
    custom: function () {
      if (this.value !== this.field('password').value) {
        return 'matchPasswords';
      }
    }
    /* eslint-enable object-shorthand */
  },
});

const RoleSchema = new SimpleSchema({
  role: {
    type: String,
    label: 'Privilege Level',
    optional: false,
    allowedValues: enumRoles,
  },
});

export { UserSchema, PwdSchema, RoleSchema };
