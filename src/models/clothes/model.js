'use strict';

const ClothesModel = (sequelize, DataTypes) => sequelize.define('Clothes', {
  type: {type: DataTypes.STRING, allowNull: false},
  color: {type: DataTypes.STRING, allowNull: false},
  size: {type: DataTypes.STRING, allowNull: false},
  expensive: {type: DataTypes.BOOLEAN, allowNull: true}
});

module.exports = ClothesModel;
