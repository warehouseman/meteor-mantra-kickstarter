import { Meteor } from './api/meteorDependencies.js';
import listModules from './moduleList';

// const LG = console.log; // eslint-disable-line no-console

var libs = require('./lib');

var srvr = Meteor.isServer ? require('./server') : null;
var srvrContext = Meteor.isServer ? require('./server/context') : null;

var loaded = false;

var clientMethods = [];
var libMethods = [];
var serverMethods = [];
var moduleNames = [];

function loadModules() {
  if ( !loaded ) {

    // LG(' imports/index() loading | ', listModules());
    listModules().names.forEach((mdle) => {
      // LG(' imports/index() loading | ', listModules()[mdle]);
      if ( Meteor.isServer ) {
        serverMethods.push(listModules()[mdle].Server);
      }
      if ( Meteor.isClient ) {
        clientMethods.push(listModules()[mdle].Client);
      }
      libMethods.push(listModules()[mdle].Lib);
      moduleNames.push(listModules()[mdle].Name);
    });
    // console.log(' imports/index() after loading | ', clientMethods);
    loaded = true;
  }
}

export const names = () => {
  loadModules();
  return moduleNames;
};

export const client = () => {
  loadModules();
  // console.log(' imports/index() clientMethods ||| ', clientMethods);
  return clientMethods;
};

export const lib = () => {
  loadModules();
  // console.log(' imports/index()   libMethods ||||', libMethods);
  return libMethods;
};

export const server = () => {
  loadModules();
  return serverMethods;
};

export const resolvers = () => {
  loadModules();
  // console.log(' imports/index()  resolvers >> ', serverMethods);
  // console.log(' imports/index()  srvr >> ', srvr);
  return srvr.resolvers(serverMethods);
};

export const schemas = () => {
  loadModules();
  // console.log(' imports/index() schemas >>> ', libs);
  return libs.schemas(libMethods);
};

export const serverContext = () => {
  return Meteor.isServer ? srvrContext : null;
};

export const initImports = () => {
  console.log('===========  initialize imports ============'); // eslint-disable-line no-console
  loadModules();
};

