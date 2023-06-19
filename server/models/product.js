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
      // define association here
      Product.belongsTo(models.User, {
        foreignKey: 'AuthorId'
      })
      Product.belongsTo(models.Category, {
        foreignKey: 'CategoryId'
      })
      Product.hasMany(models.Image, {
        foreignKey: 'ProductId'
      })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Name is required!'},
        notEmpty: {msg: 'Name is required!'}
    }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Slug is required!'},
        notEmpty: {msg: 'Slug is required!'}
    }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Description is required!'},
        notEmpty: {msg: 'Description is required!'}
    }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'Price is required!'},
        notEmpty: {msg: 'Price is required!'},
        min: {
          args: [0],
          msg: "Minimum price is 0!",
        },
    }
    },
    mainImg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Main image is required!'},
        notEmpty: {msg: 'Main image is required!'}
    }
    },
    CategoryId: DataTypes.INTEGER,
    AuthorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  Product.beforeCreate((product, options) => {
    product.slug = product.name.split(" ").join("-");
  });
  Product.beforeUpdate((product, options) => {
    product.slug = product.name.split(" ").join("-");
  });
  return Product;
};