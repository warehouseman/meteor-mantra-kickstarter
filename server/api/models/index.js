import db from '../db-connectors';

function sanityCheck(table, label, attribute, row) {
  table.findAll().then(function (result) {
    console.log(' %s #%s -- %s', label, row + 1, result[row][attribute]); // eslint-disable-line no-console
  }).catch( (error) => {
    console.log('Sequelize error while finding delivery item...', error); // eslint-disable-line no-console
  });
}


const AuthorModel = db.import('author', require('./author.js'));
const Author = db.models.author;
sanityCheck(Author, 'Author', 'lastName', 1);

const BookModel = db.import('book', require('./book.js'));
const Book = db.models.book;
sanityCheck(Book, 'Book', 'title', 0);


AuthorModel.hasMany(BookModel, { as: 'books' });
BookModel.belongsTo(AuthorModel, { as: 'author' });

// let Partner = null;
let Dummy = null;

// if ( Meteor.settings.RDBMS_DIALECT !== 'sqlite' ) {

//   db.import('tbPartners', require('./tbPartners.js'));
//   Partner = db.models.tbPartners;
//   sanityCheck(Partner, 'Partner', 'partnerName', 1);


//   // db.import('tbDeliveryItem', require('./tbDeliveryItem.js'));
//   // DeliveryItem = db.models.tbDeliveryItem;
//   // sanityCheck(DeliveryItem, 'Delivery item', 'cod', 0);

// }

// export { Author, Book, Partner, DeliveryItem, Dummy };
export { Author, Book, Dummy };
