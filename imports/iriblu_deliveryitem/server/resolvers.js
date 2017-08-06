import DeliveryItem from './attach';

const LG = console.log; // eslint-disable-line no-console,no-unused-vars

const resolvers = {
  Queries: {
    deliveryItem(_, args) {
      // LG('DeliveryItem ::: ', DeliveryItem);
      let res = DeliveryItem.findAll({ where: args });
      return res;
    }
  }
};

export default resolvers;
