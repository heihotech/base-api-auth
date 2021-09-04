module.exports = {
  secret: process.env.APP_SECRET_KEY,
  jwtExpiration: parseInt(process.env.JWT_EXPIRE),
  jwtRefreshExpiration: parseInt(process.env.JWT_REFRESH_EXPIRE),
};
