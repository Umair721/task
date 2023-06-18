
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
            const vehicles = await Vehicle.findAll();
            return resolve({
                code: 200,
                message: 'Vehicles retrieved successfully!',
                vehicles,
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
exports.deleteVehicle = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { id } = req.params;

            // Check if the vehicle exists
            const vehicle = await Vehicle.findByPk(id);
            if (!vehicle) {
                return reject({
                    code: 404,
                    message: 'Vehicle not found.',
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


