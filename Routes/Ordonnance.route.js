const express = require("express");
const router = express.Router();

const OrdonnanceController = require("../Controllers/Ordonnance.Controller");

router.get("/", OrdonnanceController.getAllOrdonnance);
router.post("/", OrdonnanceController.createNewOrdonnance);
router.get("/:id", OrdonnanceController.getOrdonnanceById);
router.patch("/:id", OrdonnanceController.updateOrdonnance);
router.delete("/:id", OrdonnanceController.deleteOrdonnance);

module.exports = router;