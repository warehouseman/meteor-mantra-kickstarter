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
if ( Meteor.settings.RDBMS_DIALECT === 'sqlite') {

  console.log(' Meteor mode -- NOT "Production"; using SQLite'); // eslint-disable-line no-console
  db = new Sequelize('mmks', null, null, {
    dialect: 'sqlite',
    logging: false,
    storage: '/tmp/db/mmks.sqlite'
  });

} else {

  console.log(' Meteor mode -- "Production" using RDBMS \', ' + // eslint-disable-line no-console
                     '\'' + Meteor.settings.RDBMS_DB + '\', ' + // eslint-disable-line no-console
                    '\'' + Meteor.settings.RDBMS_UID + '\', ' + // eslint-disable-line no-console
                    '\'' + Meteor.settings.RDBMS_PWD + '\', ' + // eslint-disable-line no-console
                    '\'' + Meteor.settings.RDBMS_HST + '\', ' + // eslint-disable-line no-console
                '\'' + Meteor.settings.RDBMS_DIALECT + '\' ');

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

}

export default db;
