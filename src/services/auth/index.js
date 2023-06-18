const auth = require("../../controller/auth");

exports.authRegister = async (req, res) => {
  try {
    const resp = await auth.authRegister(req, res);
    console.log(resp);
    res.json(resp);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
exports.authLogin = async (req, res) => {
  try {
    const resp = await auth.authLogin(req);
    console.log(resp);
    res.json(resp);
  } catch (err) {
    res.json(err);
  }
};

