/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tbDeliveryItems', {
    entregaLinesId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      field: 'entrega_lines_id',
      primaryKey: true,
    },
    entregaId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      field: 'entrega_id',
      primaryKey: false,
    },
    cod: {
      type: 'VARCHAR(7)',
      allowNull: false,
      defaultValue: null,
      primaryKey: false
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
