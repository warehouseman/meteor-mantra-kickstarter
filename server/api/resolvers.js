import { Post } from './db-connectors';

const resolvers = {
  Query: {
    posts(_, args) {
      return Post.findAll({ where: args });
    },
  },
};

export default resolvers;
