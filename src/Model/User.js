// models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');


const User = sequelize.define('User', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    calling_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },

}, {
    timestamps: false, // Disable timestamps (createdAt and updatedAt)
});


module.exports = User;
