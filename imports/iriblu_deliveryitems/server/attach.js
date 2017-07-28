import context from '../../server/context';
const db = context().Database;

db.import('tbDeliveryItems', require('./tbDeliveryItems'));
// export const DeliveryItem = db.models.tbDeliveryItems;
export default db.models.tbDeliveryItems;
