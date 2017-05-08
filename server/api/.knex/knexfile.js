module.exports = {

  continuousIntegration: {
    client: 'sqlite3',
    connection: {
      filename: '/tmp/db/mmks.sqlite'
    }
  },

  prod_mysql: {
    client: 'mysql',
    connection: {
      port : 3306,
      host : 'db_srv',
      database : 'mmks',
      user : 'meteor',
      password : 'memorablehieroglyphs'
    }
  },

//  prod_pg: {
  prod_pgres: {
    client: 'postgresql',
    connection: {
      port: 5432,
      host: 'db_srv',
      database: 'apollo',
      user: 'apollo',
      password: 'okmmpl,,',
    }
  }

};
//       filename: '../../../.meteor/local/build/programs/server/mmks.sqlite'
