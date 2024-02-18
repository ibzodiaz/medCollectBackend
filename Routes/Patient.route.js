const express = require("express");
const router = express.Router();

const PatientController = require("../Controllers/Patient.Controller");

router.get("/", PatientController.getAllPatients);
router.post("/", PatientController.createNewPatient);
router.get("/:id", PatientController.getPatientById);
router.patch("/:id", PatientController.updatePatient);
router.delete("/:id", PatientController.deletePatient);
router.delete("/cascade/:patientId", PatientController.deletePatientWithLinks);

module.exports = router;