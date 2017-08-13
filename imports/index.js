import { Meteor } from './api/meteorDependencies.js';
import listModules from './moduleList';

const LG = console.log; // eslint-disable-line no-console,no-unused-vars

const libs = require('./lib');

const srvr = Meteor.isServer ? require('./server') : null;
const srvrContext = Meteor.isServer ? require('./server/context').default : null;

var loaded = false;

var clientMethods = [];
var libMethods = [];
var serverMethods = [];
var moduleNames = [];

function loadModules() {
  if ( !loaded ) {

    listModules().names.forEach((mdle) => {
      if ( Meteor.isServer ) {
        serverMethods.push(listModules()[mdle].Server);
      }
      if ( Meteor.isClient ) {
        clientMethods.push(listModules()[mdle].Client);
      }
      libMethods.push(listModules()[mdle].Lib);
      moduleNames.push(listModules()[mdle].Name);
    });

    loaded = true;
    if ( Meteor.isServer ) {
      var db = srvrContext().Database;
      LG( ' Syncing sequelize model with database ... ' );
      db
        .sync()
        .then( () => {
          LG( '\nFor each module...' );
          serverMethods
            .forEach( srvrModule =>
              srvrModule.migration ?
                srvrModule.migration() :
                null
            ).then( () => 'fudge due to bug in promise handling of sequelize.findAll' );
        }).catch((err) => {
          if( err.message !== 'Cannot read property \'then\' of undefined' ) {
            LG('Modules iteration error. ' + err);
          }
        });
    }
  }
}

export const names = () => {
  loadModules();
  return moduleNames;
};

export const client = () => {
  loadModules();
  return clientMethods;
};

export const lib = () => {
  loadModules();
  return libMethods;
};

export const server = () => {
  loadModules();
  return serverMethods;
};

export const resolvers = () => {
  loadModules();
  return srvr.resolvers(serverMethods);
};

export const schemas = () => {
  loadModules();
  return libs.schemas(libMethods);
};

export const serverContext = () => {
  return Meteor.isServer ? srvrContext : null;
};

export const initImports = () => {
  LG('===========  initialize imports ============'); // eslint-disable-line no-console
  loadModules();
};

