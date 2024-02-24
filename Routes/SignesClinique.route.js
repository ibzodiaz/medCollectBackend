
const express = require("express");
const router = express.Router();

const SignesCliniqueController = require("../Controllers/SignesClinique.Controller");

router.get("/", SignesCliniqueController.getAllSignesCliniques);
router.post("/", SignesCliniqueController.createNewSignesCliniques);
//router.get("/:id", SignesCliniqueController.getSignesCliniquesById);
router.get("/:patientId/:consultationId", SignesCliniqueController.getSignesCliniquesOne);
router.patch("/:patientId/:consultationId", SignesCliniqueController.updateSignesCliniques);
//router.delete("/:patientId/:consultationId", SignesCliniqueController.deleteSignesCliniques);

module.exports = router;