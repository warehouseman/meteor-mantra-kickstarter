/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('knexMigrationsLock', {
    isLocked: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'is_locked'
    }
  }, {
    tableName: 'knex_migrations_lock'
  });
};
