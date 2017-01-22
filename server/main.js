import publications from './publications';
import methods from './methods';
import addInitialUsers from './configs/initial_users.js';
import { initPosts, initColors, initWidgets } from './configs/initial_adds.js';

import { WebApp } from 'meteor/webapp';
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './api/schema';
import resolvers from './api/resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({
  graphiql: true,
  pretty: true,
  schema
});

var haveLogglyToken = () => {

  if ( process.env.LOGGLY_TOKEN &&
       process.env.LOGGLY_TOKEN.length &&
       process.env.LOGGLY_TOKEN.length === 36 ) {
    return true;
  }

  if ( Meteor.settings.LOGGLY_TOKEN &&
       Meteor.settings.LOGGLY_TOKEN.length &&
       Meteor.settings.LOGGLY_TOKEN.length === 36 ) {
    return true;
  }
  return false;
};

Meteor.startup( () => {

  if ( haveLogglyToken() ) {

    WebApp.rawConnectHandlers.use( ( request, response, next ) => {
      // We need to echo the origin provided in the request
      const origin = request.headers.origin;
      if ( origin ) { response.setHeader( 'Access-Control-Allow-Origin', origin ); }

      // For the preflight
      if ( request.method === 'OPTIONS' ) {
        response.setHeader(
          'Access-Control-Allow-Headers'
          , request.headers['access-control-request-headers']
        );
        response.end();
      } else {
        return next();
      }

    });

  } else {
    /* eslint-disable no-console   */
    console.log('\n\n **STOPPED **\n' +
      '     Please ensure that your execution environment or the file, "settings.json", ' +
                               'has a valid Loggly authentication token named LOGGLY_TOKEN.\n' +
      '     either use `export LOGGLY_TOKEN=""` in the environment, or make a copy of ' +
                   '"settings.json.example", and correct the provided configuration fields.\n' +
      '     Then you can restart Meteor with the command : `meteor --settings=settings.json`\n');
    /* eslint-enable console   */
    process.exit();
  }

});

publications();
methods();
initPosts();
initColors();
initWidgets();
addInitialUsers();
