import { Class, Enum } from 'meteor/jagi:astronomy';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import App from './app.js';

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
    module: String,
    action: String,
    level: TrustLevel,
    group: String,
    roles: {
      type: [ String ],
      transient: true
    }
  },
  indexes: {
    moduleActionGroup: {
      fields: {
        module: 1,
        action: 1,
        group: 1
      },
      options: {
        unique: true
      }
    }
  },
  helpers: {
    initialize(_module, _action, _level, _group) {
      AccessControl.upsert(
        { module: _module, action: _action, group: _group },
        {
          module: _module,
          action: _action,
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

AccessControl.upsertRecord = (_module, _action, _level, _group) => {
//  console.log('upsert => ' + _module + ' : ' + _action + ' : ' + _level + ' : ' + _group);
  AccessControl.upsert(
    { module: _module, action: _action, group: _group },
    {
      module: _module,
      action: _action,
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

AccessControl.findAccessPoint = (_module, _action, _grp) => {
  // console.log('\n\n Finding => module: ' + _module + ', action: ' +
  //                                      _action + ' , group:' + _grp);

  // console.log('\n\n Finding => all: ', AccessControl.find({ }).fetch());

  let ap = AccessControl.findOne({ module: _module, action: _action, group: _grp });
  if (ap) {
    ap.roles = ap.getTrustedRoles();
  }
  return ap;
};

AccessControl.canTrust = (context, _idUser, _accessPoint) => {

  const { Tracker, LocalState } = context;
  const { module, action } = _accessPoint;

  // console.log('~~~~~~~~~~~   context : ', context);

  // Lgr.info( `got : module = ${module} action = ${action}.` );

  // console.log('\n\n canTrust got : ', module, action, Tracker, LocalState);
  // console.log('\n\n wait for ready ', _accessPoint, App.group);
  // if (Meteor.subscribe('access-points', _accessPoint, App.group).ready()) {
  //   console.log(' ready == ', _accessPoint);
  //   // const allowed = Collections.AccessControl.canTrust( Meteor.userId(), ACCESS_POINT );
  //   let ap = AccessControl.findOne({ key: 'colors.add', group: 'headOffice'});
  //   console.log('  AP ', ap.level);
  // }
  // console.log(' past wait for ready ');

  Tracker.autorun(function () {

    const ap = AccessControl.findAccessPoint( module, action, App.group );

    const authorized = ap ?
      Roles.userIsInRole(_idUser, ap.roles, ap.group) :
      false;

    let hook = module + ':' + action + ':' + App.group + ':' + _idUser;
    LocalState.set( hook, authorized );
    // console.log(`~~~~~~~~~~~   canTrust ${hook}? ${authorized}`);
    return authorized;
  });
  // Lgr.info( 'returning' );

};

export default {
  AccessControl,
  TrustLevel
};

