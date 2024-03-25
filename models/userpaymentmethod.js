'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPaymentMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  UserPaymentMethod.init({
    userId: DataTypes.INTEGER,
    cardNumber: DataTypes.BIGINT,
    cvc: DataTypes.INTEGER,
    expiryDate: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'UserPaymentMethod',
  });
  return UserPaymentMethod;
};