import { LOAD_BOOK_QUERY } from './queriesBooks.js';

export default ( args ) => {

  const { _id, ApolloClient, onData, exception } = args;

  /* eslint-disable no-console */
  ApolloClient.query({
    query: LOAD_BOOK_QUERY,
    variables: {idBook: _id},
    fetchPolicy: false,
  }).then((graphQLResult) => {

    const { errors, data } = graphQLResult;

    if (data) {
      let record = data.book[0];
      console.log(' >>  Book data :: ', record);
      onData(null, { record, exception });
    }
    if (errors) {
      console.log('got some GraphQL execution errors', errors);
    }
  }).catch((err) => {
    console.log('There was an error sending the query', err);
  });
/* eslint-enable no-console */

};
