import { merge } from 'lodash';

const LG = console.log; // eslint-disable-line no-console,no-unused-vars

export const resolvers = (modules) => {
  var collected = merge( null );
  modules
    .filter(module => module)
    .filter(module => module.resolvers)
    .filter(module => typeof module.resolvers === 'function')
    .filter(module => typeof module.resolvers() === 'object')
    .forEach((module) => {
      LG(' module :: %s has ', module.moduleName, module.resolvers()); // eslint-disable-line no-console
      merge( collected, module.resolvers() );
    });
  LG('++++++++++++  resolvers +++++++++++++++');
  LG(collected);
  LG('++++++++++++  resolvers +++++++++++++++');
  return collected;
};

export const tests = (modules) => {
  var collected = merge( null );
  modules
    .filter(module => module)
    .filter(module => module.tests)
    .forEach((module) => {
      merge( collected, module.tests() );
    });

  // LG('  Collected tests ', collected); // eslint-disable-line no-console

  return collected;
};
