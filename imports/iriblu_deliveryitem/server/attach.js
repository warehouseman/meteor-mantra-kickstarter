import context from '../../server/context';
const db = context().Database;

db.import('tbDeliveryItem', require('./tblSqlzr'));
export default db.models.tbDeliveryItem;
