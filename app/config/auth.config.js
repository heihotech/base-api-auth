module.exports = {
  secret: process.env.APP_SECRET_KEY,
  jwtExpiration: process.env.JWT_EXPIRE,
  jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRE,
};
