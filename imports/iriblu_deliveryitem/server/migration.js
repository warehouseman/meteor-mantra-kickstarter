import DeliveryItem from './attach';
import { RDBMS as sequelize } from '../../api/meteorDependencies.js';

const LG = console.log; // eslint-disable-line no-console,no-unused-vars
const entity = 'DeliveryItem';

module.exports = function () {

  return DeliveryItem.findAll({
    attributes: [ [ sequelize.fn('COUNT', sequelize.col('code')), 'numRows' ] ]
  }).then( res => {

    if ( res[0].dataValues.numRows > 0 ) {
      LG('Table "%s" has %s rows', entity, res[0].dataValues.numRows );
    } else {
      LG('Migrating data into table "%s".', entity );
      return sequelize.query(
        /* eslint-disable quotes */
        `INSERT INTO delivery_item (
           item_id
         , fk_delivery
         , code
         , createdAt
         , updatedAt
         , deletedAt )
        SELECT
           l.entrega_lines_id as item_id
         , l.entrega_id as fk_delivery
         , l.cod as code
         , e.date_entrega as createdAt
         , e.date_entrega as updatedAt
         , null
        FROM tb_entregas_lines l, tb_entregas e
        WHERE l.entrega_id = e.entrega_id`,
        { type: sequelize.QueryTypes.INSERT }
        /* eslint-enable quotes  */
      ).then( rpt => {
        LG(' - Last "item_id" of %s for %s rows inserted into "%s".', rpt[0], rpt[1], entity);
      }).catch( err => LG('query error. ' + err.message));
    }
  }).catch( err => LG('findAll error. ' + err.message));

};
