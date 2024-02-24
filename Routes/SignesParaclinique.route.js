const express = require("express");
const router = express.Router();

const SignesParacliniqueController = require("../Controllers/SignesParaclinique.Controller");

router.get("/", SignesParacliniqueController.getAllSignesParacliniques);
router.post("/", SignesParacliniqueController.createNewSignesParacliniques);
//router.get("/:id", SignesParacliniqueController.getSignesParacliniquesById);
router.get("/:patientId/:consultationId", SignesParacliniqueController.getSignesParacliniquesOne);
router.patch("/:patientId/:consultationId", SignesParacliniqueController.updateSignesParacliniques);
router.delete("/:patientId/:consultationId", SignesParacliniqueController.deleteSignesParacliniques);

module.exports = router;