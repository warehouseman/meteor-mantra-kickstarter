// import { DeliveryItem } from '../db-connectors';
import { DeliveryItem } from '../models';

/* eslint-disable no-console */
const resolvers = {
  Queries: {
    deliveryItem(_, args) {
      //      args.deleted = { $not: true };
      let res = DeliveryItem.findAll({ where: args });
      return res;
    }
  }
};

export default resolvers;
