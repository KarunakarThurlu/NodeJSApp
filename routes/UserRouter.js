const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const verifyJWT = require("../JWTUtils/VerifyToken");
const VerifyAuthority = require("../JWTUtils/VerifyAuthentication");

router.post("/login", UserController.login);

router.post("/saveuser", UserController.saveUser);

router.get("/getuser/:id", verifyJWT.verify, [VerifyAuthority.AdminOrUser], UserController.getUserById);

router.patch("/updateuser/:id", verifyJWT.verify, [VerifyAuthority.AdminOrUser], UserController.updateUser);

router.get("/getallusers", verifyJWT.verify, [VerifyAuthority.AdminOrUser], UserController.getallusers);

router.delete("/deleteuser/:id", verifyJWT.verify, [VerifyAuthority.Admin], UserController.deleteuser);

module.exports = router
