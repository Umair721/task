// models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');


const Category = sequelize.define('Category', {
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, {
    timestamps: false, // Disable timestamps (createdAt and updatedAt)
});



module.exports = Category;
