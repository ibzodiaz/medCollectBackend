const express = require("express");
const router = express.Router();

const EvolutionController = require("../Controllers/Evolution.Controller");

router.get("/", EvolutionController.getAllEvolution);
router.post("/", EvolutionController.createNewEvolution);
router.get("/:patientId/:consultationId", EvolutionController.getEvolutionOne);
router.patch("/:patientId/:consultationId", EvolutionController.updateEvolution);
router.delete("/:patientId/:consultationId", EvolutionController.deleteEvolution);

module.exports = router;