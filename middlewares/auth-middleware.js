const {prisma} = require('../prisma/prisma-client')
const ApiError = require('../exceptions/api-error');
const TokenService = require('../services/token-service.js');

module.exports = async function(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      console.log('HERE-1 >>>>');
      return next(ApiError.UnautorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];
    console.log('accessToken >>>>', accessToken);
    if (!accessToken) {
      console.log('HERE-2 >>>>');
      return next(ApiError.UnautorizedError());
    }

    const userData = TokenService.validateAccessToken(accessToken);
    console.log('userData >>>>', userData);
    if (!userData) {
      return next(ApiError.UnautorizedError());
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userData.id
      }
    })

    req.user = user;

    next();
  } catch (error) {
    return next(ApiError.UnautorizedError());
  }
}