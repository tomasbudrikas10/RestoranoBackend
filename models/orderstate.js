'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderState extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Order, {
        foreignKey: "stateId"
      })
    }
  }
  OrderState.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OrderState',
  });
  return OrderState;
};