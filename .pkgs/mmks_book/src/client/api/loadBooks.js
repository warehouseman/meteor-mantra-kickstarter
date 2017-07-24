import { LOAD_BOOKS_QUERY } from './queriesBooks.js';

export default ( args ) => {

  const { ApolloClient, onData } = args;

  /* eslint-disable no-console */
  ApolloClient.query({
    query: LOAD_BOOKS_QUERY,
    variables: { deletion: false },
    fetchPolicy: 'cache-first',
  }).then((graphQLResult) => {

    const { errors, data } = graphQLResult;

    if (data) {
      let books = data.book;
      console.log('BookList: All', data.book);
      console.log('Book 1: ', data.book[0]._id, data.book[0].title);
      onData(null, {books});
    }
    if (errors) {
      console.log('got some GraphQL execution errors', errors);
    }
  }).catch((error) => {
    console.log('there was an error sending the query', error);
  });
/* eslint-enable no-console */

};
