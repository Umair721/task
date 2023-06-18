const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');
const Category = require('./Category');

const Vehicle = sequelize.define('Vehicle', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    make: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    registration_num: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    timestamps: false,
});

// Define the association
Vehicle.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = Vehicle;
