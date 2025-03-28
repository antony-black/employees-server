const TokenService = require('../services/token-service');
const UsersService = require('../services/users-service');

class UsersController {
  async registration(req, res, next) {
    try {
      const { name, email, password } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({ message: 'Please fill out all fields.' });
      }

      const userData = await UsersService.registration(name, email, password);

      // res.cookie('refreshToken', userData.refreshToken, {
      //   maxAge: 30 * 24 * 68 * 1000,
      //   httpOnly: true,
      // });
      console.log(userData);

      res.json(userData);
    } catch (error) {
      console.error('UserController/registration: ', error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Please fill out all fields.' });
      }

      const userData = await UsersService.login(email, password);

      // res.cookie('refreshToken', userData.refreshToken, {
      //   maxAge: 30 * 24 * 68 * 1000,
      //   httpOnly: true,
      // });

      res.json(userData);
    } catch (error) {
      console.error('UserController/login: ', error);
    }
  }

  async logout(req, res) {
    try {
      // const token = await UsersService.logout(refreshToken);
      // // res.clearCookie('refreshToken');
      // res.json(token);
    } catch (error) {
      console.error('UserController/logout: ', error);
    }
  }

  async getCurrent(req, res) {
    try {
      await UsersService.getCurrent(req, res);
    } catch (error) {
      console.error('UserController/getCurrent: ', error);
    }
  }
}

module.exports = new UsersController();
