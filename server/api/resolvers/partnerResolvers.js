import { Partner } from '../db-connectors';

/* eslint-disable no-console */
const resolvers = {
  Queries: {
    partner(_, args) {
      //      args.deleted = { $not: true };
      let res = Partner.findAll({ where: args });
      return res;
    }
  }
};

export default resolvers;
