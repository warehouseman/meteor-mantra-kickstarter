import { Author } from './db-connectors';

/* eslint-disable no-console */
const resolvers = {
  Queries: {
    author(_, args) {
      args.deleted = { $not: true };
      let res = Author.findAll({ where: args });
      return res;
    },
  },

  Author: {
    books(author) {
      return author.getBooks();
    },
  },

  Mutations: {

    createAuthor: (_, args) => {
      console.log('Creating an Author ?', args);
      return Author.create(
        { firstName: args.firstName, lastName: args.lastName }
      ).then( (sequelizeResult) => {
        const { errors, dataValues } = sequelizeResult;
        if (dataValues) {
          console.log('Author, "' + args.lastName + '", has data values :: ', dataValues);
          return dataValues;
        }
        if (errors) {
          console.log('Sequelize error while retrieving the author, "' + args.lastName + '"', errors);
        }
      }).catch( (error) => {
        console.log('Sequelize error while creating the author, "' + args.lastName + '"', error);
      });
    },
/* eslint-enable no-console */
  }
};

export default resolvers;
