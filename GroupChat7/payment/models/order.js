"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Order.init(
    {
      orderId: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      amount: DataTypes.STRING,
      status: DataTypes.STRING,
      paidDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
