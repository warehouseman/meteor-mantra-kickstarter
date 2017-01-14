import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

const apoComposer = ({context}, onData) => {

  const {ApolloClient, GQL} = context();

  const MyQuery = GQL`query MyQuery {
      posts {
        _id
        title
        content
      }
    }`;

/* eslint-disable no-console */
  ApolloClient.query({
    query: MyQuery,
    forceFetch: false,
  }).then((graphQLResult) => {
    const { errors, data } = graphQLResult;

    if (data) {
      let posts = data.posts;
      console.log('ApoList: Query data', data.posts);
      onData(null, {posts});
    }
    if (errors) {
      console.log('got some GraphQL execution errors', errors);
    }
  }).catch((error) => {
    console.log('there was an error sending the query', error);
  });
/* eslint-enable no-console */

};

const composedComponent = (component) => composeAll(
  composeWithTracker(apoComposer),
  useDeps()
)(component);

export default composedComponent;
