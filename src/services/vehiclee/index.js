const vehicle = require("../../controller/vehicle");
exports.addVehicle = async (req, res) => {
    try {
        const resp = await vehicle.addVehicles(req, res);

        console.log(resp); // Log the response

        res.json(resp);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
};
exports.getAllVehicle = async (req, res) => {
    try {
        const resp = await vehicle.getAllVehicle(req, res);
        // console.log(resp);
        res.json(resp);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
};
exports.updateVehicle = async (req, res) => {
    try {
        const resp = await vehicle.updateVehicle(req, res);
        console.log(resp);
        res.json(resp);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
};
exports.deleteVehicle = async (req, res) => {
    try {
        const resp = await vehicle.deleteVehicle(req, res);
        console.log(resp);
        res.json(resp);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
};
