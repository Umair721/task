
const Category = require('../../Model/Category');

exports.addCategory = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { category_name } = req.body;
      const category = await Category.create({ category_name });

      return resolve({
        code: 200,
        message: 'Category added successfully!',
        category: category,
      });
    } catch (error) {
      console.log(error);
      return reject({
        code: 500,
        message: 'Internal server error.',
      });
    }
  })
};
exports.getAllCategory = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const categories = await Category.findAll();

      return resolve({
        code: 200,
        message: 'Categories retrieved successfully!',
        categories: categories,
      });
    } catch (error) {
      console.log(error);
      return reject({
        code: 500,
        message: 'Internal server error.',
      });
    }
  });
};
exports.updateCategory = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { category_name } = req.body;
      const { id } = req.params; // Retrieve category_id from URL parameters

      const category = await Category.findByPk(id);

      if (!category) {
        return reject({
          code: 404,
          message: 'Category not found.',
        });
      }

      category.category_name = category_name;
      await category.save();

      return resolve({
        code: 200,
        message: 'Category updated successfully!',
        category: category,
      });
    } catch (error) {
      console.log(error);
      return reject({
        code: 500,
        message: 'Internal server error.',
      });
    }
  });
};
exports.deleteCategory = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id } = req.params;

      const category = await Category.findByPk(id);

      if (!category) {
        return reject({
          code: 404,
          message: 'Category not found.',
        });
      }

      await category.destroy();

      return resolve({
        code: 200,
        message: 'Category deleted successfully!',
        category: category,
      });
    } catch (error) {
      console.log(error);
      return reject({
        code: 500,
        message: 'Internal server error.',
      });
    }
  });
};



