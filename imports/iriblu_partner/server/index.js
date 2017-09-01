import rslvrs from './resolvers';
import tests from './unit';
import migr from './migration';
import Partner from './attach';

export default {
  moduleName: 'partner',
  model: Partner,
  migration: migr,
  resolvers: () => rslvrs,
  tests: () => tests,
};
