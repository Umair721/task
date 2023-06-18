const category = require("../../controller/category");
exports.addCategory = async (req, res) => {
  try {
    const resp = await category.addCategory(req, res);

    console.log(resp); // Log the response

    res.json(resp);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
exports.getAllCategory = async (req, res) => {
  try {
    const resp = await category.getAllCategory(req, res);
    // console.log(resp);
    res.json(resp);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
exports.updateCategory = async (req, res) => {
  try {
    const resp = await category.updateCategory(req, res);
    console.log(resp);
    res.json(resp);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const resp = await category.deleteCategory(req, res);
    console.log(resp);
    res.json(resp);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
