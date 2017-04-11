module.exports = {

  continuousIntegration: {
    client: 'sqlite3',
    connection: {
      filename: '/tmp/db/mmks.sqlite'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      port: 5432,
      host: 'pgdb',
      database: 'apollo',
      user: 'apollo',
      password: 'okmmpl,,',
    }
  }

};
//       filename: '../../../.meteor/local/build/programs/server/mmks.sqlite'
