const aryTables = {};

function prep(knex) {
//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ;
//    Your specifications here

  aryTables['bottle'] = (table) => {
    table.increments('_id').primary();
    table.string('label');
    table.text('content');
    table.integer('volume');

    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').defaultTo(knex.fn.now());
    table.boolean('deleted');
  };

//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ;
};


//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ;
//    Standardized code in every migrator

const tableCreateCommands = [];
const tableDropCommands = [];

exports.up = function (knex, Promise) {
  prep(knex);
  for (var property in aryTables) {
    if (aryTables.hasOwnProperty(property)) {
      tableCreateCommands.push(
        knex.schema.createTable(property, aryTables[property])
      );
    }
  };
  return Promise.all(tableCreateCommands);
};


exports.down = function (knex, Promise) {
  prep(knex);
  for (var property in aryTables) {
    if (aryTables.hasOwnProperty(property)) {
      tableDropCommands.push(
        knex.schema.dropTable(property)
      );
    }
  };
  return Promise.all(tableDropCommands);
};
