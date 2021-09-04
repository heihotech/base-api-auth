const { verify } = require("../middleware");
const controller = require("../controllers/auth.controller");
const { joiVal } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      joiVal.validate(joiVal.schemas.auth.signUpPOST),
      verify.checkDuplicateUsernameOrEmail,
      verify.checkRolesExisted,
    ],
    controller.signup
  );

  app.post(
    "/api/auth/refreshtoken",
    [joiVal.validate(joiVal.schemas.auth.refreshTokenPOST)],
    controller.refreshToken
  );

  app.post(
    "/api/auth/signin",
    [joiVal.validate(joiVal.schemas.auth.signInPOST)],
    controller.signin
  );
};
