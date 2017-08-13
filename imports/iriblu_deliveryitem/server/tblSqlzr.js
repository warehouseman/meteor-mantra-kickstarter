const LG = console.log; // eslint-disable-line no-console,no-unused-vars

const Instance = 'DeliveryItem';
const Table = 'delivery_item';

module.exports = function (sequelize, DataTypes) {
  let DeliveryItem = sequelize.define(Instance, {
    itemId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'item_id',
      comment: 'entrega_lines_id',
    },
    fkDelivery: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'fk_delivery',
      comment: 'entrega_id',
    },
    code: {
      type: DataTypes.STRING(7),
      allowNull: false,
      field: 'code',
      comment: 'cod',
    }
  }, {
    tableName: Table,
    timestamps: true,
    paranoid: true,
  });

  return DeliveryItem;
};
