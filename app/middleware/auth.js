const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { User } = require("../models");

let authorizedRoles = [];
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
};

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });
};

checkAuthorized = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        for (let a = 0; a < authorizedRoles.length; a++) {
          if (roles[i].name === authorizedRoles[a]) {
            authorizedRoles = [];
            next();
            return;
          }
        }
      }
      authorizedRoles = [];

      res.status(403).send({
        message: "Unauthorized",
      });
    });
  });
};

superRole = (req, res, next) => {
  authorizedRoles.push("super");
  next();
  return;
};
adminRole = (req, res, next) => {
  authorizedRoles.push("admin");
  next();
  return;
};
financeRole = (req, res, next) => {
  authorizedRoles.push("finance");
  next();
  return;
};
userRole = (req, res, next) => {
  authorizedRoles.push("user");
  next();
  return;
};
nurseRole = (req, res, next) => {
  authorizedRoles.push("nurse");
  next();
  return;
};
headOfDepartmentRole = (req, res, next) => {
  authorizedRoles.push("head of department");
  next();
  return;
};
headOfSectionRole = (req, res, next) => {
  authorizedRoles.push("head of section");
  next();
  return;
};
headOfDivisionRole = (req, res, next) => {
  authorizedRoles.push("head of division");
  next();
  return;
};

const auth = {
  verifyToken: verifyToken,
  superRole: superRole,
  adminRole: adminRole,
  financeRole: financeRole,
  userRole: userRole,
  nurseRole: nurseRole,
  headOfDepartmentRole: headOfDepartmentRole,
  headOfSectionRole: headOfSectionRole,
  headOfDivisionRole: headOfDivisionRole,
  checkAuthorized: checkAuthorized,
};
module.exports = auth;
