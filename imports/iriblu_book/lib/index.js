// import defs from './typeDefs'
import tsts from './unit';

export default {
  moduleName: 'book',
  schemas: function schemas() {
    return [ 'defs' ];
  },
  tests: function tests() {
    return tsts;
  },
};
