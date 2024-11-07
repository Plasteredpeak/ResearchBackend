const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const models = require("../../models");
const { Op } = require("sequelize");

const ServiceError = require("../utils/serviceError");

const User = models.User;

exports.createUser = async (user) => {
  //check if user exists
  const userExists = await this.UserExists(user.email);
  if (userExists) {
    console.log("User already exists");
    throw new ServiceError("User already exists", 409);
  }
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = await User.create({
    ...user,
    password: hashedPassword,
  });

  if (!newUser) {
    throw new ServiceError("User not created", 500);
  }

  return newUser;
};

exports.login = async (user) => {
  const userExists = await this.UserExists(user.email);
  if (!userExists) {
    throw new ServiceError("User does not exist", 404);
  }

  const userRecord = await User.findOne({
    where: {
      email: {
        [Op.eq]: user.email,
      },
    },
  });

  const passwordMatch = await bcrypt.compare(
    user.password,
    userRecord.password
  );
  if (!passwordMatch) {
    throw new ServiceError("Invalid password", 401);
  }

  const token = jwt.sign(
    {
      email: userRecord.email,
      userId: userRecord.id,
    },
    process.env.SECRET,
    {
      expiresIn: "24h",
    }
  );

  // return token and user information

  return {
    token: token,
    user: {
      userId: userRecord.id,
      email: userRecord.email,
      userName: userRecord.userName,
    },
  };
};

exports.UserExists = async (email) => {
  const user = await User.count({
    where: {
      email: {
        [Op.eq]: email,
      },
    },
  });
  return user > 0;
};

exports.getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};
