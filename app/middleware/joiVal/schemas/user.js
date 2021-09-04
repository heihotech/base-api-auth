const Joi = require("joi");

const userCreatePOST = Joi.object().keys({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  roles: Joi.array().required(),
});

const userUpdatePOST = Joi.object().keys({
  username: Joi.string().optional(),
  email: Joi.string().optional(),
  password: Joi.string().optional(),
  roles: Joi.array().optional(),
});

module.exports = {
  userCreatePOST,
  userUpdatePOST,
};
