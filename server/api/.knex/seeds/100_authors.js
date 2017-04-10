/*
*/
exports.seed = function (knex, Promise) {
  return Promise.join(

    knex('book').del(),
    knex('author').del(),

    //  Generated from https://www.mockaroo.com/schemas/53829
    knex('author').insert({deleted: false, firstName: 'Naéva',lastName: 'Gardner'}),
    knex('author').insert({deleted: false, firstName: 'Torbjörn',lastName: 'Vasquez'}),
    knex('author').insert({deleted: false, firstName: 'Bérengère',lastName: 'Thomas'}),
    knex('author').insert({deleted: false, firstName: 'Méghane',lastName: 'Long'}),
    knex('author').insert({deleted: false, firstName: 'Larry',lastName: 'Niven'}),
    knex('author').insert({deleted: false, firstName: 'Eugénie',lastName: 'Chapman'}),
    knex('author').insert({deleted: false, firstName: 'Poul',lastName: 'Anderson'}),
    knex('author').insert({deleted: false, firstName: 'Athéna',lastName: 'Nelson'}),
    knex('author').insert({deleted: false, firstName: 'Anaël',lastName: 'Watkins'}),
    knex('author').insert({deleted: false, firstName: 'Mahélie',lastName: 'Lee'})

  );
};
