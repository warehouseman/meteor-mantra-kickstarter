import context from '../context';
const db = context().Database;

const LG = console.log; // eslint-disable-line no-console,no-unused-vars

LG('||==>+++~~~~---                THIS SCRIPT IS NEVER CALLED!');


function sanityCheck(table, label, attribute, row) {
  table.findAll().then(function (result) {
    LG(' %s #%s -- %s', label, row + 1, result[row][attribute]);
  }).catch( (error) => {
    LG('Sequelize error while finding delivery item...', error);
  });
}

let DeliveryItem = null;
let Dummy = null;

if ( Meteor.settings.RDBMS_DIALECT !== 'sqlite' ) {

  LG('++||||||||||||||||||||||||||++');
  db.import('tbDeliveryItem', require('../../iriblu_deliveryitem/server/tblSqlzr'));
  DeliveryItem = db.models.tbDeliveryItem;
  LG(db.models.sequelize.sync);
  LG('||||||||||||||||||||||||||||');
  sanityCheck(DeliveryItem, 'Delivery item', 'cod', 0);

}

export { DeliveryItem, Dummy };
