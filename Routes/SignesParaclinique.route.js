const express = require("express");
const router = express.Router();

const SignesParacliniqueController = require("../Controllers/SignesParaclinique.Controller");

router.get("/", SignesParacliniqueController.getAllSignesParacliniques);
router.post("/", SignesParacliniqueController.createNewSignesParacliniques);
//router.get("/:id", SignesParacliniqueController.getSignesParacliniquesById);
router.get("/one/:patientId", SignesParacliniqueController.getSignesParacliniquesOne);
router.patch("/:patientId", SignesParacliniqueController.updateSignesParacliniques);
router.delete("/:patientId", SignesParacliniqueController.deleteSignesParacliniques);

module.exports = router;