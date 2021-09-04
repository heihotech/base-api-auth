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

// isModerator = (req, res, next) => {
//   User.findByPk(req.userId).then((user) => {
//     user.getRoles().then((roles) => {
//       for (let i = 0; i < roles.length; i++) {
//         if (roles[i].name === "moderator") {
//           next();
//           return;
//         }
//       }

//       res.status(403).send({
//         message: "Require Moderator Role!",
//       });
//     });
//   });
// };

// isModeratorOrAdmin = (req, res, next) => {
//   User.findByPk(req.userId).then((user) => {
//     user.getRoles().then((roles) => {
//       for (let i = 0; i < roles.length; i++) {
//         if (roles[i].name === "moderator") {
//           next();
//           return;
//         }

//         if (roles[i].name === "admin") {
//           next();
//           return;
//         }
//       }

//       res.status(403).send({
//         message: "Require Moderator or Admin Role!",
//       });
//     });
//   });
// };

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

const auth = {
  verifyToken: verifyToken,
  superRole: superRole,
  adminRole: adminRole,
  financeRole: financeRole,
  checkAuthorized: checkAuthorized,
};
module.exports = auth;
