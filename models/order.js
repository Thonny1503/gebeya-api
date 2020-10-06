'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Order.belongsTo(models.Client)
    }
  };
  Order.init({
    order_number: DataTypes.STRING,
    order_date: DataTypes.DATE,
    status: DataTypes.INTEGER,
    client_id: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Order',
  });

  return Order;
};