
const express = require("express");
const router = express.Router();

const SignesCliniqueController = require("../Controllers/SignesClinique.Controller");

router.get("/", SignesCliniqueController.getAllSignesCliniques);
router.post("/", SignesCliniqueController.createNewSignesCliniques);
//router.get("/:id", SignesCliniqueController.getSignesCliniquesById);
router.get("/one/:patientId", SignesCliniqueController.getSignesCliniquesOne);
router.patch("/:patientId", SignesCliniqueController.updateSignesCliniques);
//router.delete("/:id", SignesCliniqueController.deleteSignesCliniques);

module.exports = router;