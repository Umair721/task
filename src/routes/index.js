const express = require("express");
const router = express.Router();
const authRoute = require("./auth/auth");
const verifyTokens = require("../middleware");
const { addCategory, getAllCategory, updateCategory, deleteCategory } = require("../services/category");
const { addVehicle, getAllVehicle, updateVehicle, deleteVehicle } = require("../services/vehiclee");
router.use("/auth", authRoute);

router.post(
    "/addCategory",
    verifyTokens,
    (req, res) => {
        addCategory(req, res);
    }
);
router.get("/getCategory", verifyTokens, (req, res) => {
    getAllCategory(req, res);
});
router.patch("/updateCategory/:id", verifyTokens, (req, res) => {
    updateCategory(req, res);
});

router.delete("/deleteCategory/:id", verifyTokens, (req, res) => {
    deleteCategory(req, res);
});
//vehicles routs
router.post(
    "/addVehicle",
    verifyTokens,
    (req, res) => {
        addVehicle(req, res);
    }
);
router.get("/getVehicle", verifyTokens, (req, res) => {
    getAllVehicle(req, res);
});
router.patch("/updateVehicle/:id", verifyTokens, (req, res) => {
    updateVehicle(req, res);
});

router.delete("/deleteVehicle/:id", verifyTokens, (req, res) => {
    deleteVehicle(req, res);
});


module.exports = router;
