import { Author, Book } from './db-connectors';

/* eslint-disable no-console */
const resolvers = {
  Queries: {
    book(_, args) {

      // to select deleted and undeleted records use pass in :
      // args.deleted = { $like: '%' };

//      args.deleted = args.deleted || { $not: true };
      // console.log('####### Book.findAll({ where: args }); ', args);

      let res = Book.findAll({ where: args });
      return res;
    },
  },

  Book: {
    author(book) {
      return Author.findById( book.authorId )
        .then(theAuthor => {
          if (!theAuthor) {
            console.log('Unable to find author :: ', book.authorId);
            return { message: 'Author not found' };
          }
          return theAuthor.dataValues;
        })
        .catch((error) => {
          console.log('There was an error finding the author :: ', error);
        });
    },
  },

  Mutations: {

    createBook: (_, args) => {
      console.log('Creating a Book :: ', args);
      console.log('... having Author :: ', args.authorId);
      let aBook = Book.build(
        {
          title: args.title,
          content: args.content,
          pages: args.pages,
          authorId: args.authorId,
          deleted: args.deleted
        });

      return aBook.save().then(
        (saveResult) => {
          const { errors, dataValues } = saveResult;
          if (dataValues) {
            console.log('New book data values : ', dataValues);
            return Book
            .findById( dataValues._id )
            .then(newBook => {
              if (!newBook) {
                console.log('Unable to find the newly created book :: ', dataValues._id);
                return { message: 'New book <' + dataValues._id + '>  created, but not found!' };
              }
              return dataValues;
            })
            .catch((error) => {
              console.log('Sequelize error while reloading the book, "' + args.title + '"', error);
            });
          }
          if (errors) {
            console.log('Sequelize error while finding the book, "' + args.title + '"', errors);
          }
        }
      ).catch( (error) => {
        console.log('Sequelize error while saving the book, "' + args.title + '"', error);
      });
    },

    hideBook: (_, args) => {
      console.log('Hiding a Book :: ', args);

      return Book
        .findById( args._id )
        .then(theBook => {
          if (!theBook) {
            console.log('Unable to find the book :: ', args._id);
            return { message: 'Book not found' };
          }
          return theBook
            .update({
              deleted: true,
              deletedAt: Date.now()
            }).then(
              (sequelizeResult) => {
                console.log('Book hidden :: #', sequelizeResult.dataValues._id);
                const { errors, dataValues } = sequelizeResult;
                if (dataValues) {
                  console.log('got some GraphQL results', dataValues);
                  return dataValues;
                }
                if (errors) {
                  console.log('got some GraphQL execution errors', errors);
                }
              }
            ).catch( (error) => {
              console.log('There was an error updating the book :: ', error);
            });
        })
        .catch((error) => {
          console.log('There was an error hiding the book :: ', error);
        });
    },

    updateBook: (_, args) => {
      console.log('Updating book :: ', args);
      console.log('... id\'d by :: ', args._id);
      console.log('... by Author :: ', args.authorId);

      return Book
        .findById( args._id )
        .then(theBook => {
          if (!theBook) {
            console.log('Unable to find the book :: ', args._id);
            return { message: 'Book not found' };
          }
          return theBook
            .update({
              title: args.title,
              content: args.content,
              pages: args.pages,
              authorId: args.authorId
            }).then(
              (sequelizeResult) => {
                console.log('**** updated ****', sequelizeResult.dataValues);
                const { errors, dataValues } = sequelizeResult;
                if (dataValues) {
                  console.log('got some GraphQL results', dataValues);
                  return dataValues;
                }
                if (errors) {
                  console.log('got some GraphQL execution errors', errors);
                }
              }
            ).catch( (error) => {
              console.log('There was an error updating the book :: ', error);
            });
        })
        .catch((error) => {
          console.log('There was an error finding the book :: ', error);
        });
    },
/* eslint-enable no-console */
  }
};

export default resolvers;
