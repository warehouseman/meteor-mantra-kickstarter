import { Class, Enum } from 'meteor/jagi:astronomy';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const accessControl = new Mongo.Collection('access_control');

const levelsH2L = [];
levelsH2L.push( 'Owner' );
levelsH2L.push( 'Administrator' );
levelsH2L.push( 'Staff' );
levelsH2L.push( 'Member' );
levelsH2L.push( 'Customer' );
levelsH2L.push( 'Registered' );

export const TrustLevel = Enum.create({
  name: 'TrustLevel',
  identifiers: levelsH2L
});

export const AccessControl = Class.create({

  name: 'AccessControl',
  collection: accessControl,
  fields: {
    key: String,
    level: TrustLevel,
    group: String,
    roles: {
      type: [ String ],
      transient: true
    }
  },
  indexes: {
    keyGroup: {
      fields: {
        key: 1,
        group: 1
      },
      options: {
        unique: true
      }
    }
  },
  methods: {
    initialize(_key, _level, _group) {
      AccessControl.upsert(
        { key: _key, group: _group },
        {
          key: _key,
          level: _level,
          group: _group,
          removed: false
        },
        { upsert: true }
      );
    },
    getTrustedRoles() {
      return AccessControl.getGreaterLevelsFor(levelsH2L[this.level]);
    }
  },
  behaviors: {
    softremove: {
      // The field name with a flag for marking a document as removed.
      removedFieldName: 'removed',
      // A flag indicating if a "removedAt" field should be present in a document.
      hasRemovedAtField: true,
      // The field name storing the removal date.
      removedAtFieldName: 'removedAt'
    }
  }
});

AccessControl.upsertRecord = (_key, _level, _group) => {
  AccessControl.upsert(
    { key: _key, group: _group },
    {
      key: _key,
      level: _level,
      group: _group,
      removed: false
    },
    { upsert: true }
  );
};

AccessControl.getGreaterLevelsFor = (_levelName) => {
  check(_levelName, String);
  return levelsH2L.slice(0, TrustLevel[_levelName] + 1);
};

AccessControl.getLesserLevelsFor = (_levelName) => {
  check(_levelName, String);
  return levelsH2L.slice(TrustLevel[_levelName]);
};

AccessControl.getTrustLevels = () => {
  return TrustLevel.getIdentifiers();
};

AccessControl.findAccessPoint = (_key, _grp) => {
  let ap = AccessControl.findOne({ key: _key, group: _grp });
  ap.trusted = ap.getTrustedRoles();
  return ap;
};
