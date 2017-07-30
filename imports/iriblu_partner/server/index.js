import tsts from './unit';
// import rslvrs from './resolvers';

export default {
  moduleName: 'partner',
  resolvers: function resolvers() {
    return 'Got partner:server';
  },
  tests: function tests() {
    return tsts;
  },
};

// export default () => {
//   return 'Got partner:server';
// };
