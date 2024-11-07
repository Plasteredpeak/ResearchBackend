const Validator = require("validatorjs");

const apiResponse = require("../utils/apiResponse");

const userServices = require("../services/userServices");

exports.signup = async (req, res) => {
  try {
    const validation = new Validator(req.body, {
      userName: "required|string",
      email: "required|email",
      password: "required|string",
    });

    if (validation.fails()) {
      return apiResponse.fail(res, validation.errors, 400);
    }

    const user = await userServices.createUser(req.body);

    return apiResponse.success(res, req, user);
  } catch (error) {
    return apiResponse.fail(
      res,
      error.message,
      error.status || error.statusCode || 500
    );
  }
};

exports.login = async (req, res) => {
  try {
    const validation = new Validator(req.body, {
      email: "required|email",
      password: "required|string",
    });

    if (validation.fails()) {
      return apiResponse.fail(res, validation.errors, 400);
    }

    const user = await userServices.login(req.body);

    return apiResponse.success(res, req, user);
  } catch (error) {
    return apiResponse.fail(res, error.message, error.status || 500);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userServices.getAllUsers();

    return apiResponse.success(res, req, users);
  } catch (error) {
    return apiResponse.fail(res, error.message, error.status || 500);
  }
};
