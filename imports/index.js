import listModules from './moduleList';
// import srvr from './server';
import libs from './lib';

var srvr = Meteor.isServer ? require('./server') : null;
var srvrContext = Meteor.isServer ? require('./server/context') : null;

var loaded = false;

var clientMethods = [];
var libMethods = [];
var serverMethods = [];
var moduleNames = [];

function loadModules() {
  if ( ! loaded ) {

    listModules.names.forEach((mdle, idx) => {
//      console.log('#' + idx + ' - loaded module : %s', listModules[mdle].Name);
      clientMethods.push(listModules[mdle].Client);
      libMethods.push(listModules[mdle].Lib);
      serverMethods.push(listModules[mdle].Server);
      moduleNames.push(listModules[mdle].Name);
    });
    loaded = true;
  }
}

export const names = () => {
  loadModules();
  return moduleNames;
}

export const client = () => {
  loadModules();
  return clientMethods;
}

export const lib = () => {
  loadModules();
  return libMethods;
}

export const server = () => {
  loadModules();
  return serverMethods;
}

export const resolvers = () => {
  loadModules();
  return srvr.resolvers(serverMethods);
}

export const schemas = () => {
  loadModules();
//  console.log(' imports/index() schemas /////|\\\\\\\\\\', libs);
  return libs.schemas(libMethods);
}

export const serverContext = () => {
  return Meteor.isServer ? srvrContext : null;
}

export const initImports = () => {
   console.log('=========================  initialize imports ======================');
   loadModules();
}

