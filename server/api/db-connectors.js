import Sequelize from 'sequelize';
const LG = console.log; // eslint-disable-line no-console,no-unused-vars

LG(' Sanity Check -- Can we see settings?');
LG(' RDBMS_DB --> ', Meteor.settings.RDBMS_DB );
LG(' RDBMS UID --> ', Meteor.settings.RDBMS_UID );
LG(' IS_GITSUBMODULE --> ', Meteor.settings.public.IS_GITSUBMODULE );

let pwd = Meteor.settings.RDBMS_PWD;
let len = pwd.length;
var mid = len / 2;
pwd = '*'.repeat(len - mid) + pwd.slice(mid);
LG(' RDBMS PWD --> ', pwd );
LG(' RDBMS HST --> ', Meteor.settings.RDBMS_HST );
LG(' RDBMS DIALECT --> ', Meteor.settings.RDBMS_DIALECT );

let RDBMS;
if ( Meteor.settings.RDBMS_DIALECT === 'sqlite') {

  LG(' Meteor mode -- NOT "Production"; using SQLite'); // eslint-disable-line no-console
  RDBMS = new Sequelize('mmks', null, null, {
    dialect: 'sqlite',
    logging: false,
    storage: '/tmp/db/mmks.sqlite'
  });

} else {

  LG(' Meteor mode -- "Production" using RDBMS \', ' + // eslint-disable-line no-console
                     '\'' + Meteor.settings.RDBMS_DB + '\', ' + // eslint-disable-line no-console
                    '\'' + Meteor.settings.RDBMS_UID + '\', ' + // eslint-disable-line no-console
                    '\'' + Meteor.settings.RDBMS_PWD + '\', ' + // eslint-disable-line no-console
                    '\'' + Meteor.settings.RDBMS_HST + '\', ' + // eslint-disable-line no-console
                '\'' + Meteor.settings.RDBMS_DIALECT + '\' ');

  RDBMS = new Sequelize(
    Meteor.settings.RDBMS_DB,
    Meteor.settings.RDBMS_UID,
    Meteor.settings.RDBMS_PWD,
    {
      host: Meteor.settings.RDBMS_HST,
      // logging: LG,
      dialect: Meteor.settings.RDBMS_DIALECT
    }
  );

}

export default RDBMS;
