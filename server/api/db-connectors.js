import Sequelize from 'sequelize';

/* eslint-disable no-console */
console.log(' Sanity Check -- Can we see settings?');
console.log(' RDBMS_DB --> ', Meteor.settings.RDBMS_DB );
console.log(' RDBMS UID --> ', Meteor.settings.RDBMS_UID );
console.log(' IS_GITSUBMODULE --> ', Meteor.settings.public.IS_GITSUBMODULE );

let pwd = Meteor.settings.RDBMS_PWD;
let len = pwd.length;
var mid = len / 2;
pwd = '*'.repeat(len - mid) + pwd.slice(mid);
console.log(' RDBMS PWD --> ', pwd );
console.log(' RDBMS HST --> ', Meteor.settings.RDBMS_HST );
console.log(' RDBMS DIALECT --> ', Meteor.settings.RDBMS_DIALECT );

/* eslint-enable no-console */

let db = null;
if ( Meteor.isProduction ) {

  console.log(' Meteor mode -- "Production" using RDBMS \'' + // eslint-disable-line no-console
                       Meteor.settings.RDBMS_DIALECT + '\'');

  db = new Sequelize(
    Meteor.settings.RDBMS_DB,
    Meteor.settings.RDBMS_UID,
    Meteor.settings.RDBMS_PWD,
    {
      host: Meteor.settings.RDBMS_HST,
      logging: false,
      dialect: Meteor.settings.RDBMS_DIALECT
    }
  );

} else {
  console.log(' Meteor mode -- NOT "Production"; using SQLite'); // eslint-disable-line no-console
  db = new Sequelize('mmks', null, null, {
    dialect: 'sqlite',
    logging: false,
    storage: '/tmp/db/mmks.sqlite'
  });
}

const AuthorModel = db.import('author', require('./models/author.js'));
const Author = db.models.author;

const BookModel = db.import('book', require('./models/book.js'));
const Book = db.models.book;


AuthorModel.hasMany(BookModel, { as: 'books' });
BookModel.belongsTo(AuthorModel, { as: 'author' });


let book = Book.findAll();
book.then(function (result) {
  console.log(' We got the first book -- ', result[0].title); // eslint-disable-line no-console
}).catch( (error) => {
  console.log('Sequelize error while finding books...', error); // eslint-disable-line no-console
});

let Partner = null;

if ( Meteor.isProduction ) {

//  const PartnerModel =
  db.import('tbPartners', require('./models/tbPartners.js'));

  Partner = db.models.tbPartners;
  let partner = Partner.findAll();
  partner.then(function (result) {
    console.log(' We got the first partner -- ', result[0].partnerName); // eslint-disable-line no-console
  }).catch( (error) => {
    console.log('Sequelize error while finding partners...', error); // eslint-disable-line no-console
  });

}

export { Author, Book, Partner };
