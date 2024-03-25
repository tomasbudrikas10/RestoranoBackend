'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Role, {
        foreignKey: 'roleId'
      })
      this.hasMany(models.UserPaymentMethod, {
        foreignKey: "userId"
      })
      this.hasMany(models.Order, {
        foreignKey: "userId"
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    location: DataTypes.STRING,
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};