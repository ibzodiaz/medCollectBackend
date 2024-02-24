const express = require("express");
const router = express.Router();

const FichiersController = require("../Controllers/Fichiers.Controller");

router.get("/", FichiersController.getAllFichiers);
router.post("/", FichiersController.createNewFichiers);
router.get("/:id", FichiersController.getFichiersById);
router.get("/one/:patientId", FichiersController.getFichiersPatient);
router.patch("/:id", FichiersController.updateFichiers);
router.delete("/:id", FichiersController.deleteFichiers);

module.exports = router;