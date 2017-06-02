/*
*/
exports.seed = function (knex, Promise) {
  return Promise.join(

    knex('book').del(),
    knex('author').del(),

    //  Generated from https://www.mockaroo.com/schemas/53829
    knex('author').insert({_id: 01, deleted: false, firstName: 'Naéva',lastName: 'Gardner'}),
    knex('author').insert({_id: 02, deleted: false, firstName: 'Torbjörn',lastName: 'Vasquez'}),
    knex('author').insert({_id: 03, deleted: false, firstName: 'Bérengère',lastName: 'Thomas'}),
    knex('author').insert({_id: 04, deleted: false, firstName: 'Méghane',lastName: 'Long'}),
    knex('author').insert({_id: 05, deleted: false, firstName: 'Larry',lastName: 'Niven'}),
    knex('author').insert({_id: 06, deleted: false, firstName: 'Eugénie',lastName: 'Chapman'}),
    knex('author').insert({_id: 07, deleted: false, firstName: 'Poul',lastName: 'Anderson'}),
    knex('author').insert({_id: 08, deleted: false, firstName: 'Athéna',lastName: 'Nelson'}),
    knex('author').insert({_id: 09, deleted: false, firstName: 'Anaël',lastName: 'Watkins'}),
    knex('author').insert({_id: 10, deleted: false, firstName: 'Mahélie',lastName: 'Lee'})

  );
};
