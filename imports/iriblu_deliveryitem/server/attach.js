import context from '../../server/context';
const db = context().Database;

db.import('DeliveryItem', require('./tblSqlzr'));
export default db.models.DeliveryItem;
