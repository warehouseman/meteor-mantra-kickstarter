import rslvrs from './resolvers';
import tests from './unit';
import migr from './migration';
import DeliveryItem from './attach';

export default {
  moduleName: 'deliveryItem',
  model: DeliveryItem,
  migration: migr,
  resolvers: () => rslvrs,
  tests: () => tests,
};
