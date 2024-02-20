const express = require("express");
const router = express.Router();

const EvolutionController = require("../Controllers/Evolution.Controller");

router.get("/", EvolutionController.getAllEvolution);
router.post("/", EvolutionController.createNewEvolution);
router.get("/one/:patientId", EvolutionController.getEvolutionOne);
router.patch("/:patientId", EvolutionController.updateEvolution);
router.delete("/:patientId", EvolutionController.deleteEvolution);

module.exports = router;