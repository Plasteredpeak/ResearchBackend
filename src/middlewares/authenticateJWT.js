const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        // Token verification failed
        return res.status(401).json({ error: "Invalid token" });
      }

      req.userId = decoded.userId;
      next();
    });
  } else {
    // Token is missing
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authenticateJWT;
