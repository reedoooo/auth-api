"use strict";

const Team = (sequelize, DataTypes) =>
  sequelize.define("Team", {
    name: { type: DataTypes.STRING, allowNull: false },
    mascot: { type: DataTypes.STRING, allowNull: false },
    size: { type: DataTypes.INTEGER, allowNull: false },
  });

module.exports = Team;
