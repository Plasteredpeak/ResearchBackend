const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const authenticateJWT = require("../middlewares/authenticateJWT");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
// router.get("/logout", userController.logout);

router.use(authenticateJWT);

router.route("/").get(userController.getAllUsers);

module.exports = router;
