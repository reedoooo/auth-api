'use strict';

const cardModel = (sequelize, DataTypes) => sequelize.define('Cards', {
  name: {type: DataTypes.STRING, allowNull: false},
  type: {type: DataTypes.STRING, allowNull: false},
  level: {type: DataTypes.INTEGER, allowNull: false},
  monster: {type: DataTypes.BOOLEAN, allowNull: false}
});

module.exports = cardModel;
