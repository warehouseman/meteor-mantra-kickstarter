let Meteor;
let Mongo;
let RDBMS;
// let createContainer;

if (global.meteorBabelHelpers) { // This is only true in Meteor environment
  Meteor = require('meteor/meteor').Meteor;
  Mongo = require('meteor/mongo').Mongo;
  if ( Meteor.isServer ) {
    RDBMS = require('../../server/api/db-connectors.js').default;
  }
  // createContainer = require('meteor/react-meteor-data').createContainer;
} else { //   This is for our unit tests
  const td = require('testdouble');
  Meteor = { isServer: true, isClient: true, };
  Mongo = td.object( [ 'Collection' ] );
  const SequelizeMock = require('sequelize-mock');
  RDBMS = new SequelizeMock();
  RDBMS.import = (name, callback) => { return { name, callback }; };
  // createContainer = {};
}

// export {Meteor,Mongo,createContainer};
export {Meteor, Mongo, RDBMS};
