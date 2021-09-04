"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.belongsToMany(models.User, {
        foreignKey: "roleId",
        through: "UserRoles",
        onDelete: "CASCADE",
      });
    }
  }
  Role.init(
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: Sequelize.STRING,
    },
    {
      paranoid: true,
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
