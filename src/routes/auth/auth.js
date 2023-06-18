const express = require("express");
const authRouter = express.Router();
const {
  validationMiddleWare,
  loginValidation,
} = require("../../middleware/validation");
const {
  authRegister,
  authLogin,


} = require("../../services/auth");


authRouter.post("/signup", validationMiddleWare, async (req, res) => {
  authRegister(req, res);
});
authRouter.post("/login", loginValidation, async (req, res) => {
  authLogin(req, res);
});




module.exports = authRouter;
