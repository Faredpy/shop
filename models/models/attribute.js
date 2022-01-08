'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product, {
        foreignKey: 'productId'
      })
    }
  };
  Attribute.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Attribute',
  });
  return Attribute;
};