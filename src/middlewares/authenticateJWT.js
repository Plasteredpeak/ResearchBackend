const jwt = require("jsonwebtoken");
const apiResponse = require("../utils/apiResponse");

const authenticateJWT = (req, res, next) => {
  // Get the token from Authorization header
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Splitting "Bearer <token>" to get the token

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        // Token verification failed
        return apiResponse.fail(res, "invalid token", 401);
      }

      req.userId = decoded.userId;
      next();
    });
  } else {
    return apiResponse.fail(res, "token not provided", 401);
  }
};

module.exports = authenticateJWT;
