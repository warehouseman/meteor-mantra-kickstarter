module.exports = {

  continuousIntegration: {
    client: 'sqlite3',
    connection: {
      filename: '/tmp/db/mmks.sqlite'
    },
    useNullAsDefault: true
  },

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
