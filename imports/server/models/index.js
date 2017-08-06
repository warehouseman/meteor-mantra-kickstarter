import context from '../context';
const db = context().Database;

function sanityCheck(table, label, attribute, row) {
  table.findAll().then(function (result) {
    console.log(' %s #%s -- %s', label, row + 1, result[row][attribute]); // eslint-disable-line no-console
  }).catch( (error) => {
    console.log('Sequelize error while finding delivery item...', error); // eslint-disable-line no-console
  });
}

let DeliveryItem = null;
let Dummy = null;

if ( Meteor.settings.RDBMS_DIALECT !== 'sqlite' ) {

  db.import('tbDeliveryItem', require('../../iriblu_deliveryitem/server/tblSqlzr'));
  DeliveryItem = db.models.tbDeliveryItem;
  sanityCheck(DeliveryItem, 'Delivery item', 'cod', 0);

}

export { DeliveryItem, Dummy };
