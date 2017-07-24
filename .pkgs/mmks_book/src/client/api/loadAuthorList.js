import { LOAD_AUTHORS_QUERY } from './queriesAuthors.js';

let authors = null;
let authorOptions = [ {label: 'undefined', value: 0} ];

// export default ( ApolloClient, model, exception, onData ) => {

export default ( args ) => {
  const { ApolloClient, onData } = args;


  /* eslint-disable no-console */
  ApolloClient.query({
    query: LOAD_AUTHORS_QUERY,

    fetchPolicy: false,
  }).then((rslt) => {
    //    console.log('Authors query result ', rslt);
    const { errors, data } = rslt;

    if (data) {
      authors = data.author;
      // console.log('AuthorList: All', authors);
      // console.log('Author #1: ', data.author[0]._id, data.author[0].lastName);
      authorOptions = authors.map((item) => {
        return {
          value: item._id, label: [ item.lastName,item.firstName ].join(', ')
        };
      });

      onData(null, { authorOptions } );
    }
    if (errors) {
      console.log('got some GraphQL execution errors', errors);
    }
  }).catch((error) => {
    console.log('there was an error sending the query', error);
  });
  /* eslint-enable no-console */
};
