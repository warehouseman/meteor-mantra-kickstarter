import DeliveryItem from './attach';

/* eslint-disable no-console */
const resolvers = {
  Queries: {
    deliveryItem(_, args) {
      // console.log('DeliveryItem ::: ', DeliveryItem);
      let res = DeliveryItem.findAll({ where: args });
      return res;
    }
  }
};

export default resolvers;
