// import { Partner } from '../db-connectors';
import { Partner } from '../models';

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
