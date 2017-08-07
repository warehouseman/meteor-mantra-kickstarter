/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tbDeliveryItem', {
    entregaLinesId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'entrega_lines_id',
    },
    entregaId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'entrega_id',
    },
    cod: {
      type: DataTypes.STRING(7),
      allowNull: false,
      field: 'cod',
    },
    createdAt: {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: 'current_timestamp()',
      primaryKey: false
    }
  }, {
    timestamps: false,
    tableName: 'tb_entregas_lines'
  });
};
