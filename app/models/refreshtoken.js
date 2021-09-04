"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const config = require("../config/auth.config");

module.exports = (sequelize, Sequelize) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RefreshToken.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "SET NULL",
      });
    }
  }

  RefreshToken.init(
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      token: Sequelize.STRING,
      expiryDate: Sequelize.DATE,
    },
    {
      sequelize,
      modelName: "RefreshToken",
    }
  );

  RefreshToken.createToken = async function (user) {
    let expiredAt = new Date();

    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

    let _token = uuidv4();

    let createdToken = "";

    await sequelize
      .transaction(async (t) => {
        const createdRefreshToken = await this.create(
          {
            token: _token,
            userId: user.id,
            expiryDate: expiredAt.getTime(),
          },
          { transaction: t }
        );

        return createdRefreshToken;
      })
      .then((data) => {
        createdToken = data.token;
      })
      .catch((err) => {
        return err;
      });

    return createdToken;
  };

  RefreshToken.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
  };
  return RefreshToken;
};
