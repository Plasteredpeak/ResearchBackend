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
