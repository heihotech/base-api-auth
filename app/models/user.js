"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Role, {
        foreignKey: "userId",
        through: "UserRoles",
        onDelete: "CASCADE",
      });
      User.hasOne(models.RefreshToken, {
        foreignKey: "userId",
        onDelete: "SET NULL",
      });
    }
  }
  User.init(
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      username: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
    },
    {
      paranoid: true,
      timestamps: true,
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
