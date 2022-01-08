'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Type, {
        foreignKey: 'typeId'
      })
      this.belongsTo(models.Brand, {
        foreignKey: 'brandId'
      })
      this.hasMany(models.Attribute, {
        foreignKey: 'productId'
      })
      this.belongsToMany(models.Basket, {
        through: 'BasketProducts',
        foreignKey: 'productId',
      })
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    raiting: DataTypes.INTEGER,
    img: DataTypes.STRING,
    typeId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};