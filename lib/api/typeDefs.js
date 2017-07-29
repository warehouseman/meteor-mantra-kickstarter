// import { concat } from 'lodash';

import { schema as globalSchema } from './globalTypes';
import { schema as bookSchema } from './book/book';
import { schema as authorSchema } from './book/author';
import { schema as partnerSchema } from './person/partner';
// import { schema as deliveryItemSchema } from './delivery/deliveryItem';

import { schemas as imported } from '/imports';

const importedSchemas = imported();
// console.log('------------------------------------------------------ ');
// console.log('lib/api/typedefs schemas ORIG :: ', deliveryItemSchema);
// console.log('------------------------------------------------------ ');
// console.log('lib/api/typedefs schemas NEW :: ', importedSchemas[0]);
// console.log('------------------------------------------------------ ');

export const mergeTypes = (ary, type, note) => {
  return ary.reduce(
    (A, V) => {
      return A.endsWith(note) ?
        A + `  type ${type} {\n      ${V}\n  }\n\n` :
        A + `  extend type ${type} {\n    ${V}\n  }\n\n`;
    }
    , note
  );
};

var typ = '';
var mut = [];
var qry = [];
// [
//   bookSchema,
//   authorSchema,
//   partnerSchema,
//   globalSchema,
//   deliveryItemSchema
// ].forEach(function (schema) {

// .concat(importedSchemas)
[
  bookSchema,
  authorSchema,
  partnerSchema,
  globalSchema
].concat(importedSchemas)
  .forEach(function (schema) {
    typ += schema.typ;
    mut = mut.concat(schema.mut);
    qry = qry.concat(schema.qry);
  });

const typeDefs = '  ## Accumulated Types ## \n' + typ;

const mutations = mergeTypes(
  mut, 'Mutations', '  ## Accumulated Mutations ## \n'
);
const queries = mergeTypes(
  qry, 'Queries', '  ## Accumulated Queries ## \n'
);

const schema = `
  schema {
    query: Queries,
    mutation: Mutations
  }
`;

export default [
  typeDefs + mutations + queries + schema
];
