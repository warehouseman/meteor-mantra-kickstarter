import tsts from './unit';
// import defs from './typeDefs'

export default {
  moduleName: 'partner',
  schemas: function schemas() {
    return [ 'defs' ];
  },
  tests: function tests() {
    return tsts;
  },
};

