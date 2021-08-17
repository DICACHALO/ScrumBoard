const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const Auth = require("../middleware/auth.js");
const ValidateUser = require("../middleware/validateUser");

router.post("/registerUser", UserController.registerUser);

// http://localhost:3001/api/user/listUser/[nombre o si está vacío lista todo]
router.get("/listUser/:name?",  Auth, ValidateUser, UserController.listUser);

module.exports = router;