const { prisma } = require('../prisma/prisma-client');
const bcrypt = require('bcrypt');
const TokenService = require('./token-service');
const UserDto = require('../dto/user-dto');

class UsersService {
  async registration(name, email, password) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      throw new Error('User with this email has already existed. Please, login.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const registredUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const userData = new UserDto(registredUser);

    const tokens = TokenService.generateTokens({ ...userData });
    // TokenService.save(userData.id, tokens.refreshToken);

    return { ...tokens, userData };
  }

  async login(email, password) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    const isPasswordsEqualed = await bcrypt.compare(password, user.password);
    console.log("isPasswordsEqualed >>>>", isPasswordsEqualed);
    
    if (!user || !isPasswordsEqualed) {
      throw new Error('Wrong email or password.');
    }

    const userData = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userData });
    // TokenService.save(userData.id, tokens.refreshToken);

    return {
      ...tokens,
      userData,
    };
  }

  async logout(refreshToken) {
    // const token = TokenService.remove(refreshToken);

    // return token;
  }

  async getCurrent(req, res) {
    return res.status(200).json(req.user)
  }
}

module.exports = new UsersService();
