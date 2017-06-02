/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('knexMigrations', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'name'
    },
    batch: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'batch'
    },
    migrationTime: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'migration_time'
    }
  }, {
    tableName: 'knex_migrations'
  });
};
