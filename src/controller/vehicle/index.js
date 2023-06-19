
const Category = require('../../Model/Category');
const Vehicle = require('../../Model/Vehicle');

exports.addVehicles = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user_id = req.details.id;
            const { category_id, color, model, make, registration_num } = req.body;
            const vehicle = await Vehicle.create({
                user_id,
                category_id,
                color,
                model,
                make,
                registration_num,
            });

            return resolve({
                code: 200,
                message: 'Vehicle added successfully!',
                vehicle,
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


exports.updateVehicle = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { id } = req.params;
            const { category_id, color, model, make, registration_num } = req.body;
            const vehicle = await Vehicle.findByPk(id);

            if (!vehicle) {
                return reject({
                    code: 404,
                    message: 'Vehicle not found',
                });
            }

            vehicle.category_id = category_id;
            vehicle.color = color;
            vehicle.model = model;
            vehicle.make = make;
            vehicle.registration_num = registration_num;

            await vehicle.save();

            return resolve({
                code: 200,
                message: 'Vehicle updated successfully!',
                vehicle,
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


exports.getAllVehicle = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const vehicles = await Vehicle.findAll({
                include: {
                    model: Category,
                    attributes: ['category_name'], // Specify the desired attribute(s) from the categories table
                },
            });

            // Process the fetched data
            const processedVehicles = vehicles.map((vehicle) => {
                return {
                    id: vehicle.id,
                    vehicle_name: vehicle.vehicle_name,
                    color: vehicle.color,
                    make: vehicle.make,
                    registration_num: vehicle.registration_num,
                    make: vehicle.make,
                    model: vehicle.model,
                    // Retrieve the category_name from the associated Category model
                    category_name: vehicle.Category.category_name,
                };
            });

            return resolve({
                code: 200,
                message: 'Vehicles retrieved successfully!',
                vehicles: processedVehicles,
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

exports.deleteVehicle = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { id } = req.params;
            const user_id = req.details.id

            // Check if the vehicle exists
            const vehicle = await Vehicle.findByPk(id);
            if (!vehicle) {
                return reject({
                    code: 404,
                    message: 'Vehicle not found.',
                });
            }
            if (vehicle.user_id !== user_id) {
                return reject({
                    code: 403,
                    message: 'You do not have permission to delete this vehicle.',
                });
            }
            // Delete the vehicle
            await vehicle.destroy();

            return resolve({
                code: 200,
                message: 'Vehicle deleted successfully!',
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


