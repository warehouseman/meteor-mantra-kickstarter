import Sequelize from 'sequelize';

/* eslint-disable no-console */
console.log(' Sanity Check -- Can we see settings?');
console.log(' RDBMS_DB --> ', Meteor.settings.RDBMS_DB );
console.log(' RDBMS UID --> ', Meteor.settings.RDBMS_UID );
console.log(' RDBMS PWD --> ', Meteor.settings.RDBMS_PWD );
console.log(' RDBMS HST --> ', Meteor.settings.RDBMS_HST );
console.log(' RDBMS DIALECT --> ', Meteor.settings.RDBMS_DIALECT );

/* eslint-enable no-console */

let sequelize = null;
if ( Meteor.isProduction ) {

  console.log(' Meteor mode -- "Production" using RDBMS \'' + // eslint-disable-line no-console
                       Meteor.settings.RDBMS_DIALECT + '\'');

  sequelize = new Sequelize(
    Meteor.settings.RDBMS_DB,
    Meteor.settings.RDBMS_UID,
    Meteor.settings.RDBMS_PWD,
    {
      host: Meteor.settings.RDBMS_HST,
      dialect: Meteor.settings.RDBMS_DIALECT
    }
  );

} else {
  console.log(' Meteor mode -- NOT "Production"; using SQLite'); // eslint-disable-line no-console
  sequelize = new Sequelize('mmks', null, null, {
    dialect: 'sqlite',
    storage: '/tmp/db/mmks.sqlite'
  });
}

export const db = sequelize;

const AuthorModel = db.define('author', {
  _id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true // Automatically gets converted to SERIAL for postgres
  },
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  deleted: { type: Sequelize.BOOLEAN },
  deletedAt: { type: Sequelize.DATE },
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

const BookModel = db.define('book', {
  _id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: { type: Sequelize.STRING },
  content: { type: Sequelize.STRING },
  pages: { type: Sequelize.STRING },
  deleted: { type: Sequelize.BOOLEAN },
  deletedAt: { type: Sequelize.DATE },
}, {
  freezeTableName: true
});

const PartnerModel = db.define( // eslint-disable-line no-unused-vars
  'tb_partners', {
    /* eslint-disable camelcase  */
    partner_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: { type: Sequelize.STRING },
    company: { type: Sequelize.BOOLEAN },
    client: { type: Sequelize.BOOLEAN },
    supplier: { type: Sequelize.BOOLEAN },
    civil_status: { type: Sequelize.BOOLEAN },
    gender: { type: Sequelize.BOOLEAN },
    nationality: { type: Sequelize.BOOLEAN },
    legal_id: { type: Sequelize.STRING },
    group_code: { type: Sequelize.INTEGER },
    telf_primary: { type: Sequelize.STRING },
    telf_secundary: { type: Sequelize.STRING },
    celular_phone: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    webPage: { type: Sequelize.STRING },
    contact_person: { type: Sequelize.STRING },
    notes: { type: Sequelize.STRING },
    sales_person: { type: Sequelize.STRING },
    status: { type: Sequelize.BOOLEAN },
    create_by: { type: Sequelize.STRING },
    creation_date: { type: Sequelize.DATE },
    last_update: { type: Sequelize.DATE },
    country_acc: { type: Sequelize.STRING },
    state_acc: { type: Sequelize.STRING },
    city_acc: { type: Sequelize.STRING },
    canton_acc: { type: Sequelize.STRING },
    parish_acc: { type: Sequelize.STRING },
    postal_code_acc: { type: Sequelize.STRING },
    street_acc: { type: Sequelize.STRING },
    bulding_acc: { type: Sequelize.STRING },
    country_res: { type: Sequelize.STRING },
    state_res: { type: Sequelize.STRING },
    city_res: { type: Sequelize.STRING },
    canton_res: { type: Sequelize.STRING },
    parish_res: { type: Sequelize.STRING },
    postal_code_res: { type: Sequelize.STRING },
    street_res: { type: Sequelize.STRING },
    bulding_res: { type: Sequelize.STRING },
    /* eslint-enable camelcase  */
  }, {
    freezeTableName: true
  }
);

AuthorModel.hasMany(BookModel, { as: 'books' });
BookModel.belongsTo(AuthorModel, { as: 'author' });

const Author = db.models.author;
const Book = db.models.book;
const Partner = db.models.tb_partners;

let book = Book.findAll();
book.then(function (result) {
  console.log(' We got the first book -- ', result[0].title); // eslint-disable-line no-console
}).catch( (error) => {
  console.log('Sequelize error while finding books...', error); // eslint-disable-line no-console
});

if ( Meteor.isProduction ) {
  let partner = Partner.findAll();
  partner.then(function (result) {
    console.log(' We got the first partner -- ', result[0].name); // eslint-disable-line no-console
  }).catch( (error) => {
    console.log('Sequelize error while finding partners...', error); // eslint-disable-line no-console
  });
}

export { Author, Book, Partner };
