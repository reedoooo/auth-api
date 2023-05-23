"use strict";

const Teammate = (sequelize, DataTypes) => {sequelize.define("Teammate", {
    name: { type: DataTypes.STRING, allowNull: false },
    role: {type: DataTypes.STRING, allowNull: false },
    teamId: { type: DataTypes.INTEGER, allowNull: false },
  });
};

module.exports = Teammate;
