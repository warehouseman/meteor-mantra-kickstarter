import { merge } from 'lodash';
export const resolvers = (methods) => {
//  console.log(" METHODS ::: ", methods);
  var collected = merge( null );
  methods
    .filter(method => method.default.resolvers)
    .forEach((method) => {
//      console.log("   METHOD ::: ", method.default.resolvers);
      merge( collected, method.default.resolvers() );
  });
//  console.log("  COLLECTED  ::: ", collected);
  return collected;
}

