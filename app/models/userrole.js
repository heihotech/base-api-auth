"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserRole.init(
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
      },
      roleId: {
        type: Sequelize.UUID,
        references: {
          model: "Roles",
          key: "id",
        },
      },
    },
    {
      timestamps: true,
      paranoid: false,
      sequelize,
      modelName: "UserRole",
    }
  );
  return UserRole;
};
