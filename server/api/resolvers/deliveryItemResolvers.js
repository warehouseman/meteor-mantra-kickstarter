import { DeliveryItem } from '../db-connectors';

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
