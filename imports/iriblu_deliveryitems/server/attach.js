import context from '../../server/context';
const db = context().Database;

db.import('tbDeliveryItems', require('./tbDeliveryItems'));
export default db.models.tbDeliveryItems;
