module.exports = {

  continuousIntegration: {
    client: 'sqlite3',
    connection: {
      filename: '/tmp/db/mmks.sqlite'
    }
  },

// //  prod_pg: {
//   prod_pgres: {
//     client: 'postgresql',
//     connection: {
//       port: 5432,
//       host: 'db_srv',
//       database: 'apollo',
//       user: 'apollo',
//       password: 'okmmpl,,',
//     }
//   },

  production: {
    client: process.env.RDBMS_DIALECT,
    connection: {
      port : process.env.RDBMS_PORT,
      host : process.env.RDBMS_HST,
      database : process.env.RDBMS_DB,
      user : process.env.RDBMS_UID,
      password : process.env.RDBMS_PWD
    }
  }

};


//       filename: '../../../.meteor/local/build/programs/server/mmks.sqlite'
