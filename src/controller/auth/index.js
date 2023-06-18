const bcrypt = require("bcrypt");
const randomstring = require('randomstring');
var secret = process.env.SECRET;
var jwt = require("jsonwebtoken");
const { sendEmail } = require("../../helpers/Email");
const User = require('../../Model/User');

// Register User

exports.authRegister = (req, res) => {

  return new Promise(async (resolve, reject) => {

    try {

      const check = await User.findOne({ where: { email: req.body.email } });
      const contact_check = await User.findOne({ where: { contact_number: req.body.contact_number } });

      if (check) {

        return reject({
          code: 400,
          message: "Email already exists.",
        });

      }
      else if (contact_check) {

        return reject({
          code: 400,
          message: "Contact number already exists.",
        });

      } else {

        const randomPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        const newUser = await User.create({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hashedPassword,
          calling_code: req.body.calling_code,
          contact_number: req.body.contact_number,
        });

        if (newUser) {
          sendEmail(newUser?.first_name, newUser?.email, randomPassword)
          return resolve({
            user: newUser,
            code: 200,
            message: "User Created Successfully",
          });
        } else {
          return reject({
            code: 400,
            message: "User does not Created Successfully",
          });
        }
      }
    } catch (error) {
      console.log(error);
      return reject({ code: 500, message: "Internal server error." });
    }
  });
};

// Login

exports.authLogin = async (req, res) => {

  return new Promise(async (resolve, reject) => {

    try {

      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return reject({
          code: 400,
          message: "Incorrect email.",
        });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,


          },
          secret,
          {
            expiresIn: '24h', // expires in 24 hours
          }
        );

        return resolve({
          code: 200,
          message: "Login Successfully.",
          token: token,
          userInfo: user,
        });
      } else {
        return reject({
          code: 400,
          message: "Incorrect password.",
        });
      }
    } catch (error) {

      console.log(error);
      return reject({ code: 500, message: "Internal server error." });

    }

  });

};



