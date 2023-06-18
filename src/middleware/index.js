var secret = process.env.SECRET;
var jwt = require("jsonwebtoken");

function verifyTokens(req, res, next) {
  var token = req.headers.authorization;


  if (!token) {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }

  jwt.verify(token, secret, function (err, decoded) {
    if (err) {
      console.log(err.name); // Print the name of the specific error
      return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
    } else {
      req.details = decoded;
      next();
    }
  });
}

module.exports = verifyTokens;
