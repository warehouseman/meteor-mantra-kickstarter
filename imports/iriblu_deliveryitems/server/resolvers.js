// import { DeliveryItem } from '../db-connectors';
import DeliveryItem from './attach';
// import DeliItem from '/imports/server/models';

/* eslint-disable no-console */
const resolvers = {
  Queries: {
    deliveryItem(_, args) {

//         console.log('DeliItem :: ', DeliItem);
      console.log('DeliveryItem ::: ', DeliveryItem);
      //      args.deleted = { $not: true };
      let res = DeliveryItem.findAll({ where: args });
      return res;
    }
  }
};

export default resolvers;
