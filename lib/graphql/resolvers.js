import { Post } from '/lib/graphql/db-connectors';

const resolvers = {
  Query: {
    posts(_, args) {
      return Post.findAll({ where: args });
    },
  },
};

export default resolvers;
